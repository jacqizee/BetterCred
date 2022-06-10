from django.urls import path
from .views import IssuerView

urlpatterns = [
    path('', IssuerView.as_view())
]