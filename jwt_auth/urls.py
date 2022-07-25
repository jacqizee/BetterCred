from django.urls import path

from .views import RegisterView, LoginView, ProfileView, WalletView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='user-register'),
    path('login/', LoginView.as_view(), name='user_login'),
    path('profile/<int:pk>/', ProfileView.as_view()),
    path('profile/<int:pk>/wallet/', WalletView.as_view()),
]