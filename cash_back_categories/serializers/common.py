from rest_framework.serializers import ModelSerializer
from ..models import CashBackCategory

class CashBackSerializer(ModelSerializer):
    class Meta:
        model = CashBackCategory
        fields = '__all__'