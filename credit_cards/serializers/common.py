from rest_framework.serializers import ModelSerializer
from ..models import CreditCard

class CreditCardSerializer(ModelSerializer):
    class Meta:
        model = CreditCard
        fields = '__all__'

class SimpleCreditCardSerializer(ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('name', 'image', 'credit_range', 'annual_fee', 'cash_back_category')