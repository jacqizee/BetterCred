from django.urls import path
from .views import AllCreditCardView, OneCreditCardView

urlpatterns = [
    path('', AllCreditCardView.as_view()),
    path('<int:pk>/', OneCreditCardView.as_view()),
]