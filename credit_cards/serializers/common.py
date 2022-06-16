from rest_framework.serializers import ModelSerializer
from ..models import CreditCard

class CreditCardSerializer(ModelSerializer):
    class Meta:
        model = CreditCard
        fields = '__all__'

class SimpleCreditCardSerializer(ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('id', 'name', 'image', 'credit_range', 'annual_fee', 'foreign_fee', 'cash_back_category')