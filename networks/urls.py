from django.urls import path
from .views import NetworkView

urlpatterns = [
    path('', NetworkView.as_view())
]