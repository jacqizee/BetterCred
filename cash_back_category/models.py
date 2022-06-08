from django.db import models

# Create your models here.

class CashBackCategory(models.Model):
    type = models.CharField(max_length=50)