from django.db import models
from django.forms import NullBooleanField

# Create your models here.

class CreditCard(models.Model):
    name = models.CharField(max_length = 50)
    image = models.CharField(max_length = 500)
    link = models.CharField(max_length = 500)
    annual_fee = models.IntegerField(default = None)
    foreign_fee = models.FloatField(max_length=5)
    base_reward_rate = models.FloatField(max_length=5)
    regular_APR = models.FloatField(max_length=5)
    pro_1 = models.CharField(max_length = 75, default = None)
    pro_2 = models.CharField(max_length = 75, default = None)
    pro_3 = models.CharField(max_length = 75, default = None)
    con_1 = models.CharField(max_length = 75, default = None)
    con_2 = models.CharField(max_length = 75, default = None)
    con_3 = models.CharField(max_length = 75, default = None)
    issuer = models.ForeignKey('issuers.Issuer', related_name = 'credit_cards', on_delete = models.PROTECT, default=None)
    network = models.ForeignKey('networks.Network', related_name = 'credit_cards', on_delete = models.PROTECT, default=None)
    cash_back_category = models.ManyToManyField('cash_back_categories.CashBackCategory', related_name = 'credit_cards', default=None)
    credit_range = models.ForeignKey('credit_ranges.CreditRange', related_name = 'credit_cards', on_delete = models.PROTECT, default=None)
    # bonus_offers = models.ManyToOneRel

    def __str__(self):
        return f'{self.name}'