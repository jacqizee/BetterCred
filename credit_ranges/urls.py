from django.urls import path
from .views import CreditRangeView

urlpatterns = [
    path('', CreditRangeView.as_view())
]