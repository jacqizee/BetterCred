from .common import CashBackSerializer
from credit_cards.serializers.common import SimpleCreditCardSerializer

class PopulatedCashBackSerializer(CashBackSerializer):
    credit_cards = SimpleCreditCardSerializer(many=True)