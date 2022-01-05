from rest_framework import generics
from api import serializers, models

# Create your views here.
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


class AddressesView(generics.ListCreateAPIView):
  queryset = models.Address.objects.all()
  serializer_class = serializers.AddressSerializer


class AddressView(generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Address.objects.all()
  serializer_class = serializers.AddressSerializer
