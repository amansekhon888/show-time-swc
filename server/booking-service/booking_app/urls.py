from django.urls import path
from .views import booking_test

urlpatterns = [
    path('test', booking_test),
]
