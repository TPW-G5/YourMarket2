"""yourmarket URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api import views

from rest_framework.authtoken import views as token_views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include([
        path('v1/', include([
            # Public endpoints
            path('category/', include([
                path('', views.CategoriesView.as_view()),
                path('<int:pk>', views.CategoryView.as_view())
            ])),
            path('product/', include([
                path('', views.ProductsView.as_view()),
                path('<int:pk>', views.ProductView.as_view())
            ])),

            path('signup', views.SignUpView.as_view()),
            path('login', token_views.ObtainAuthToken.as_view()),
            path('profile', views.ProfileView.as_view()),

            # Registered endpoints
            path('order/', include([
                path('', views.OrdersView.as_view()),
                path('<int:pk>', views.OrderView.as_view()),
            ])),
            path('address/', include([
                path('', views.AddressesView.as_view()),
                path('<int:pk>', views.AddressView.as_view())
            ])),
            path('cart/', include([
                path('', views.CartView.as_view()),
                path('<int:pk>', views.CartItemView.as_view()),
            ])),

            # Staff Stuff
            path('users/', include([
                path('', views.UsersView.as_view()),
                path('<int:pk>', views.UserView.as_view())
            ])),
            path('staff/', include([
                path('', views.StaffView.as_view())
            ])),
        ]))
    ]))
]
