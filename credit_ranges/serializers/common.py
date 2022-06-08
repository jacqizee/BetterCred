from rest_framework.serializers import ModelSerializer
from ..models import CreditRange

class CreditRangeSerializer(ModelSerializer):
    class Meta:
        model = CreditRange
        fields = '__all__'