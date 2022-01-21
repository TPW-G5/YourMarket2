from django.contrib import admin

# Register your models here.
from api.models import Category, Product, CartItem, Address, OrderState, Order, OrderStateUpdate, OrderItem

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(Address)
admin.site.register(OrderState)
admin.site.register(Order)
admin.site.register(OrderStateUpdate)
admin.site.register(OrderItem)