from .common import CreditRangeSerializer
from credit_cards.serializers.common import SimpleCreditCardSerializer

class PopulatedCreditRangeSerializer(CreditRangeSerializer):
    credit_cards = SimpleCreditCardSerializer(many=True)