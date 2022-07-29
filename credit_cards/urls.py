from django.urls import path
from .views import AllCreditCardView, OneCreditCardView

urlpatterns = [
    path('', AllCreditCardView.as_view(), name='all-credit-cards'),
    path('<int:pk>/', OneCreditCardView.as_view(), name='one-credit-card'),
]