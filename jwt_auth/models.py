from django.db import models
from django.contrib.auth.models import AbstractUser

from credit_cards.models import CreditCard

# Create your models here.

class User(AbstractUser):
    email: models.EmailField(max_length=50, unique=True)
    first_name: models.CharField(max_length=20)
    last_name: models.CharField(max_length=20)
    profile_picture: models.CharField(max_length=300)
    wallet: models.ManyToManyField(CreditCard, related_name='users', blank=True)
