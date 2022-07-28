from django.db import models

# Create your models here.

class CreditRange(models.Model):
    range = models.CharField(max_length=35)

    def __str__(self): # pragma: no cover
        return f'{self.range}'