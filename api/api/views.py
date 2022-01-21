from django.http import HttpRequest, HttpResponse
from rest_framework import generics, views
from api import serializers, models

from rest_framework import status
from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class AuthBaseView:
  authentication_classes = (TokenAuthentication,)
  permission_classes = (IsAuthenticated,)  

class CategoriesView(generics.ListCreateAPIView):
  queryset = models.Category.objects.all()
  serializer_class = serializers.CategorySerializer


class CategoryView(generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Category.objects.all()
  serializer_class = serializers.CategorySerializer


class ProductsView(generics.ListCreateAPIView):
  queryset = models.Product.objects.all()
  serializer_class = serializers.ProductSerializer


class ProductView(generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Product.objects.all()
  serializer_class = serializers.ProductSerializer


class OrdersView(AuthBaseView, generics.ListCreateAPIView):
  queryset = models.Order.objects.all()
  serializer_classes = {'GET': serializers.OrderSerializer, 'POST': serializers.CreateOrderSerializer}

  def get_serializer_class(self):
    return self.serializer_classes.get(self.request.method)

  def list(self, request, *args, **kwargs):
      serialized = serializers.OrderSerializer(models.Order.objects.filter(user=request.user).all(), many=True)
      return Response(serialized.data)

  def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      order = serializer.create({ 'user': request.user })

      serialized = serializers.OrderSerializer(order)
      
      return Response(serialized.data, status=status.HTTP_201_CREATED)


class OrderView(AuthBaseView, generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Order.objects.all()
  serializer_class = serializers.OrderSerializer


class AddressesView(AuthBaseView, generics.ListCreateAPIView):
  queryset = models.Address.objects.all()
  serializer_class = serializers.AddressSerializer


class AddressView(AuthBaseView, generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Address.objects.all()
  serializer_class = serializers.AddressSerializer


class SignUpView(generics.ListCreateAPIView):
  queryset = models.User.objects.all()
  serializer_class = serializers.UserSerializer

class CartView(AuthBaseView, views.APIView):
  def get(self, request, format=None):
    user = request.user
    items = models.CartItem.objects.filter(user=user).all()
    return Response(serializers.CartItemSerializer(items, many=True).data)

  def post(self, request: HttpRequest, format=None):
    user = request.user
    product = models.Product.objects.get(id=request.data['product'])

    if request.data['amount'] <= 0:
      models.CartItem.objects.filter(user=user, product=product).delete()
      return Response()
    
    try:
      item = models.CartItem.objects.get(user=user, product=product)
      item.amount = request.data['amount']
      item.save()
    except models.CartItem.DoesNotExist:
      item = models.CartItem.objects.create(user = user, product = product, amount = request.data['amount'])
    
    return Response(serializers.CartItemSerializer(item).data)