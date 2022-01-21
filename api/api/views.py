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


class OrdersView(generics.ListCreateAPIView):
  queryset = models.Order.objects.all()
  serializer_classes = {'GET': serializers.OrderSerializer, 'POST': serializers.CreateOrderSerializer}

  def get_serializer_class(self):
    return self.serializer_classes.get(self.request.method)

  def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      order = serializer.create(request.data)

      serialized = serializers.OrderSerializer(order)
      
      headers = self.get_success_headers(serializer.data)
      return Response(serialized.data, status=status.HTTP_201_CREATED, headers=headers)


class OrderView(generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Order.objects.all()
  serializer_class = serializers.OrderSerializer


class AddressesView(AuthBaseView, generics.ListCreateAPIView):
  queryset = models.Address.objects.all()
  serializer_class = serializers.AddressSerializer


class AddressView(generics.RetrieveUpdateDestroyAPIView, AuthBaseView):
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
    item = models.CartItem.objects.create(user = user, product = product, amount = request.data['amount'])
    return Response(serializers.CartItemSerializer(item).data)