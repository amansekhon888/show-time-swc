from django.urls import path, include

urlpatterns = [
    path('booking/', include('booking_app.urls')),
]
