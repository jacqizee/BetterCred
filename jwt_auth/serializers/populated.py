from rest_framework.serializers import SerializerMethodField

from .common import UserSerializer
from credit_cards.serializers.common import CreditCardSerializer

class PopulatedUserSerializer(UserSerializer):
    wallet = SerializerMethodField()

    def get_wallet(self, obj):
        return CreditCardSerializer(many=True)

