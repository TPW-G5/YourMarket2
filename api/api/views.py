from rest_framework import generics, views
from api import serializers, models

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
  serializer_class = serializers.OrderSerializer


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