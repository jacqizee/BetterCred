from django.db import models

# Create your models here.

class CashBackCategory(models.Model):
    type = models.CharField(max_length=50, unique=True)

    def __str__(self): # pragma: no cover
        return f'{self.type}'