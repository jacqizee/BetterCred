from django.urls import path
from .views import CashBackView

urlpatterns = [
    path('', CashBackView.as_view())
]