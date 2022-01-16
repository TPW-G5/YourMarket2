from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=70)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_DEFAULT, default=1)
    name = models.CharField(max_length=70)
    description = models.TextField(max_length=200, default=None)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(default=1)

    def __str__(self):
        return "CartItem [ user =  " + str(self.user) + "; product = " + str(self.product) + "; amount = " + str(self.amount) + " ]"


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    fullName = models.CharField(max_length=150)
    address = models.CharField(max_length=200)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.address


class OrderState(models.Model):
    name = models.CharField(max_length=70)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paymentId = models.CharField(max_length=50,editable=False)

    def get_total(self):
        return sum(list(map(lambda item: item.price*item.amount, OrderItem.objects.filter(order=self))))

    def last_state(self):
        return OrderStateUpdate.objects.filter(order=self).order_by('-datetime').first()

    def get_items(self):
        return OrderItem.objects.filter(order=self)

    def __str__(self):
        return "Order [ user =  " + str(self.user) + "; paymentId = " + self.paymentId + " ]"


class OrderStateUpdate(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='states')
    orderState = models.ForeignKey(OrderState, default=1, on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "OrderStateUpdate [ order =  " + str(self.order) + "; orderState = " + str(self.orderState) + "; datetime = " + str(self.datetime) + " ]"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    amount = models.PositiveIntegerField()
    
    def __str__(self):
        return "OrderItem [ order =  " + str(self.order) + "; product = " + str(self.product) + "; price = " + str(self.price) + "; amount = " + str(self.amount) + " ]"