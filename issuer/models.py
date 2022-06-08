from django.db import models

# Create your models here.

class Issuer(models.Model):
    name = models.CharField(max_length=25)
    logo = models.CharField(max_length=500)