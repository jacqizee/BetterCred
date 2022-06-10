from .common import IssuerSerializer
from credit_cards.serializers.common import SimpleCreditCardSerializer

class PopulatedIssuerSerializer(IssuerSerializer):
    credit_cards = SimpleCreditCardSerializer(many=True)