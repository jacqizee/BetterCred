from rest_framework.serializers import ModelSerializer
from ..models import CreditCard

class CreditCardSerializer(ModelSerializer):
    class Meta:
        model = CreditCard
        fields = '__all__'