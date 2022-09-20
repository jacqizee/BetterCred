from rest_framework.serializers import ModelSerializer, StringRelatedField
from ..models import CreditCard

from issuers.serializers.common import IssuerSerializer

class SimpleCreditCardSerializer(ModelSerializer):
    issuer = IssuerSerializer()
    credit_range = StringRelatedField()
    cash_back_category = StringRelatedField(many=True)

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

class CreditCardSerializer(SimpleCreditCardSerializer):
    network = StringRelatedField()

    class Meta(SimpleCreditCardSerializer.Meta):
        model = CreditCard
        fields = '__all__'