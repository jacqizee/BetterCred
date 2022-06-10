from .common import UserSerializer
from credit_cards.serializers.common import CreditCardSerializer

class PopulatedUserSerializer(UserSerializer):
    credit_cards = CreditCardSerializer(many=True)