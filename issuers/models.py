from django.db import models

# Create your models here.

class Issuer(models.Model):
    name = models.CharField(max_length=25, unique=True)
    logo = models.CharField(max_length=500)
    link = models.CharField(max_length=500)

    def __str__(self): # pragma: no cover
        return f'{self.name}'