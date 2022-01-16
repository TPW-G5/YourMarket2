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


class OrderStateSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.OrderState
    fields = '__all__'

class OrderStateUpdateSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.OrderStateUpdate
    fields = '__all__'

class CreateOrderItemSerializer(serializers.Serializer):
  product = serializers.IntegerField()
  amount = serializers.IntegerField()


class CreateOrderSerializer(serializers.ModelSerializer):
  items = CreateOrderItemSerializer(many=True)

  class Meta:
    model = models.Order
    fields = '__all__'

  def create(self, validated_data):
      order = models.Order.objects.create(user_id=validated_data['user'])
      for item in validated_data['items']:
        product = models.Product.objects.get(pk=item['product'])
        print(models.OrderItem.objects.create(order=order, product_id=product.id, price=product.price, amount=1))

      models.OrderStateUpdate.objects.create(order=order)
      
      return order


class OrderItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.OrderItem
    fields = '__all__'
  

class OrderSerializer(serializers.ModelSerializer):
  price = serializers.SerializerMethodField()
  states = OrderStateUpdateSerializer(many=True)
  items = OrderItemSerializer(many=True)
  class Meta:
    model = models.Order
    fields = '__all__'

  def get_price(self, obj: models.Order):
    return obj.get_total()

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
