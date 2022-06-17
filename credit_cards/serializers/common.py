from rest_framework.serializers import ModelSerializer
from ..models import CreditCard

from issuers.serializers.common import IssuerSerializer

class CreditCardSerializer(ModelSerializer):
    issuer = IssuerSerializer()

    class Meta:
        model = CreditCard
        fields = '__all__'

class SimpleCreditCardSerializer(ModelSerializer):
    issuer = IssuerSerializer()

    class Meta:
        model = CreditCard
        fields = (
            'id',
            'name',
            'image',
            'credit_range',
            'annual_fee',
            'foreign_fee',
            'cash_back_category',
            'base_reward_rate',
            'issuer'
        )