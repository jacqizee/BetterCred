from .common import NetworkSerializer
from credit_cards.serializers.common import SimpleCreditCardSerializer

class PopulatedNetworkSerializer(NetworkSerializer):
    credit_cards = SimpleCreditCardSerializer(many=True)