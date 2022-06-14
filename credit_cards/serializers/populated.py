from .common import CreditCardSerializer
from jwt_auth.serializers.common import SimpleUserSerializer

class PopulatedCreditCardSerializer(CreditCardSerializer):
    users = SimpleUserSerializer(many = True)