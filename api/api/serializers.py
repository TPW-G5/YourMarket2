from api import models
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Category
    fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
  category = CategorySerializer()
  class Meta:
    model = models.Product
    fields = '__all__'


class OrderStateSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.OrderState
    fields = '__all__'

class OrderStateUpdateSerializer(serializers.ModelSerializer):
  state = serializers.SerializerMethodField()
  class Meta:
    model = models.OrderStateUpdate
    fields = ('datetime', 'state')

  def get_state(self, instance: models.OrderStateUpdate):
    return OrderStateSerializer(instance.orderState).data

class CartItemSerializer(serializers.ModelSerializer):
  product = serializers.SerializerMethodField()
  class Meta:
    model = models.CartItem
    fields = ('product', 'amount')

  def get_product(self, instance: models.CartItem):
    return ProductSerializer(instance.product).data

class CreateCartItemSerializer(serializers.Serializer):
  product = serializers.IntegerField()
  amount = serializers.IntegerField()


class CreateOrderSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Order
    fields = '__all__'

  def create(self, validated_data):
      order = models.Order.objects.create(user=validated_data['user'])

      items = models.CartItem.objects.filter(user=validated_data['user'])
      for item in items.all():
        models.OrderItem.objects.create(order=order, product_id=item.product.id, price=item.product.price, amount=item.amount)
      items.delete()

      models.OrderStateUpdate.objects.create(order=order)
      
      return order


class OrderItemSerializer(serializers.ModelSerializer):
  product = ProductSerializer()
  class Meta:
    model = models.OrderItem
    fields = ('product', 'amount', 'price')
  

class OrderSerializer(serializers.ModelSerializer):
  price = serializers.SerializerMethodField()
  states = OrderStateUpdateSerializer(many=True)
  items = OrderItemSerializer(many=True)
  class Meta:
    model = models.Order
    fields = ('id', 'states', 'items', 'price')

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
