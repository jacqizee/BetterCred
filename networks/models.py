from django.db import models

# Create your models here.

class Network(models.Model):
    name = models.CharField(max_length=25)
    logo = models.CharField(max_length=500)

    def __str__(self): # pragma: no cover
        return f'{self.name}'