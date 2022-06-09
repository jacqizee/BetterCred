from rest_framework.serializers import ModelSerializer
from ..models import Issuer

class IssuerSerializer(ModelSerializer):
    class Meta:
        model = Issuer
        fields = '__all__'
