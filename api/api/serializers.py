from api import models
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Category
    fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Product
    fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.OrderItem
    fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
  price = serializers.SerializerMethodField()
  state = serializers.SerializerMethodField()
  items = serializers.SerializerMethodField()

  class Meta:
    model = models.Order
    fields = '__all__'

  def get_price(self, obj: models.Order):
    return obj.get_total()

  def get_state(self, obj: models.Order):
    return obj.last_state()

  def get_items(self, obj: models.Order):
    return obj.get_items()


class AddressSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Address
    fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.User
    fields = '__all__'

  def create(self, validated_data):
      user = super().create(validated_data)
      user.set_password(validated_data['password'])
      user.is_active = True
      user.save()
      return user