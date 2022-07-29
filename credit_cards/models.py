from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.

class CreditCard(models.Model):
    name = models.CharField(max_length = 50, unique=True)
    image = models.CharField(max_length = 500)
    link = models.CharField(max_length = 500)
    annual_fee = models.IntegerField(default = None)
    foreign_fee = models.FloatField(max_length=5)
    base_reward_rate = models.FloatField(max_length=5)
    regular_APR_min = models.FloatField(max_length=5)
    regular_APR_max = models.FloatField(max_length=5)
    pro_1 = models.CharField(max_length = 75, blank = True)
    pro_2 = models.CharField(max_length = 75, blank = True)
    pro_3 = models.CharField(max_length = 75, blank = True)
    con_1 = models.CharField(max_length = 75, blank = True)
    con_2 = models.CharField(max_length = 75, blank = True)
    con_3 = models.CharField(max_length = 75, blank = True)
    issuer = models.ForeignKey('issuers.Issuer', related_name = 'credit_cards', on_delete = models.PROTECT, default = None)
    network = models.ForeignKey('networks.Network', related_name = 'credit_cards', on_delete = models.PROTECT, default = None)
    cash_back_category = models.ManyToManyField('cash_back_categories.CashBackCategory', related_name = 'credit_cards', blank = True)
    credit_range = models.ForeignKey('credit_ranges.CreditRange', related_name = 'credit_cards', on_delete = models.PROTECT, default = None)
    # bonus_offers = models.ManyToOneRel

    def __str__(self): # pragma: no cover
        return f'{self.name}'