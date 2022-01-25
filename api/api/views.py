from django.http import HttpRequest, HttpResponse
from rest_framework import generics, views, mixins
from api import serializers, models

from rest_framework import status
from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission


# Create your views here.


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)

class AuthBaseView:
  authentication_classes = (TokenAuthentication,)
  permission_classes = (IsAuthenticated,)

class StaffAuthBaseView:
  authentication_classes = (TokenAuthentication,)
  permission_classes = (IsAdminUser,)

class AdminAuthBaseView:
  authentication_classes = (TokenAuthentication,)
  permission_classes = (IsSuperUser,)

class CategoriesView(generics.ListCreateAPIView):
  queryset = models.Category.objects.all()
  serializer_class = serializers.CategorySerializer


class CategoryView(generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Category.objects.all()
  serializer_class = serializers.CategorySerializer


class ProductsView(generics.ListCreateAPIView):
  queryset = models.Product.objects.all()
  serializer_classes = {'GET': serializers.ProductSerializer, 'POST': serializers.CreateProductSerializer}
  filterset_fields = ('category', )
  search_fields = ('name', )

  def get_serializer_class(self):
    return self.serializer_classes.get(self.request.method)


class ProductView(generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Product.objects.all()
  serializer_classes = {'PUT': serializers.CreateProductSerializer}

  def get_serializer_class(self):
    return self.serializer_classes.get(self.request.method, serializers.ProductSerializer)
  
  def put(self, request: HttpRequest, format=None, **kwargs):
      id = kwargs['pk']
      try:
          product = models.Product.objects.get(id=id)
      except models.Product.DoesNotExist:
          return Response(status=status.HTTP_404_NOT_FOUND)
      serializer = serializers.CreateProductSerializer(product, data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrdersView(AuthBaseView, generics.ListCreateAPIView):
  queryset = models.Order.objects.all()
  serializer_classes = {'GET': serializers.OrderSerializer, 'POST': serializers.CreateOrderSerializer}

  def get_serializer_class(self):
    return self.serializer_classes.get(self.request.method)

  def list(self, request, *args, **kwargs):
      orders = models.Order.objects.all() if request.user.is_staff else models.Order.objects.filter(user=request.user).all()
      serialized = serializers.OrderSerializer(orders, many=True)
      return Response(serialized.data)

  def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      order = serializer.create({ 'user': request.user })

      serialized = serializers.OrderSerializer(order)
      
      return Response(serialized.data, status=status.HTTP_201_CREATED)

class OrdersViewByUser(StaffAuthBaseView, generics.ListAPIView):
  queryset = models.Order.objects.all()
  filterset_fields = ('user', )
  serializer_class = serializers.OrderSerializer

class OrderView(AuthBaseView, generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Order.objects.all()
  serializer_class = serializers.OrderSerializer


class AddressesView(AuthBaseView, generics.ListCreateAPIView):
  queryset = models.Address.objects.all()
  serializer_class = serializers.AddressSerializer


class AddressView(AuthBaseView, generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Address.objects.all()
  serializer_class = serializers.AddressSerializer


class SignUpView(generics.CreateAPIView):
  queryset = models.User.objects.filter(is_staff=False).all()
  serializer_class = serializers.UserSerializer


class ProfileView(AuthBaseView, views.APIView):
  def get(self, request, format=None):
    return Response(serializers.UserSerializer(request.user).data)


class CartView(AuthBaseView, views.APIView):
  def get(self, request, format=None):
    user = request.user
    items = models.CartItem.objects.filter(user=user).all()
    return Response(serializers.CartItemSerializer(items, many=True).data)

  def post(self, request: HttpRequest, format=None):
    user = request.user
    product = models.Product.objects.get(id=request.data['product'])

    if int(request.data['amount']) <= 0:
      models.CartItem.objects.filter(user=user, product=product).delete()
      return Response()
    
    try:
      item = models.CartItem.objects.get(user=user, product=product)
      item.amount = request.data['amount']
      item.save()
    except models.CartItem.DoesNotExist:
      item = models.CartItem.objects.create(user = user, product = product, amount = request.data['amount'])
    
    return Response(serializers.CartItemSerializer(item).data)

class CartItemView(AuthBaseView, views.APIView):
  def get(self, request, pk, format=None):
    user = request.user

    try:
      item = models.CartItem.objects.get(user=user, product_id=pk)
    except models.CartItem.DoesNotExist:
      return Response()
    return Response(serializers.CartItemSerializer(item).data)

class StaffView(AdminAuthBaseView, generics.ListAPIView):
  queryset = models.User.objects.filter(is_staff=True, is_superuser=False).all()
  serializer_class = serializers.UserSerializer

  def post(self, request: HttpRequest, format=None):
    data = {k:v for k, v in request.data.items()}

    user = models.User.objects.create(**data)
    user.set_password(data['password'])
    user.is_active = True
    user.is_staff = True
    user.save()
    return Response(self.serializer_class(user).data)

class UsersView(StaffAuthBaseView, generics.ListAPIView):
  queryset = models.User.objects.filter(is_staff=False).all()
  serializer_class = serializers.UserSerializer

class UserView(StaffAuthBaseView, generics.RetrieveUpdateAPIView):
  queryset = models.User.objects.filter(is_staff=False).all()
  serializer_class = serializers.UserSerializer
  
class SingleStaffView(AdminAuthBaseView, generics.RetrieveUpdateDestroyAPIView):
  queryset = models.User.objects.filter(is_staff=True).all()
  serializer_class = serializers.UserSerializer

class StateChangeView(StaffAuthBaseView, views.APIView):
  def put(self, request: HttpRequest, pk, format=None, **kwargs):
    try:
        order = models.Order.objects.get(id=pk)
    except models.Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    orderStateUpdate = models.OrderStateUpdate.objects.filter(order=order).order_by('-datetime').first()
    newState = None
    if orderStateUpdate.orderState == models.OrderState.objects.get(name = "Pending"):
      newState = models.OrderState.objects.get(name = "Processing")
    elif orderStateUpdate.orderState == models.OrderState.objects.get(name = "Processing"):
      newState = models.OrderState.objects.get(name = "Delivering")
    elif orderStateUpdate.orderState == models.OrderState.objects.get(name = "Delivering"):
      newState = models.OrderState.objects.get(name = "Delivered")

    models.OrderStateUpdate.objects.create(orderState = newState, order=order)

    return Response()