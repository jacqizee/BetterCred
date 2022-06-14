from rest_framework.serializers import SerializerMethodField

from .common import UserSerializer
from credit_cards.serializers.common import SimpleCreditCardSerializer

class PopulatedUserSerializer(UserSerializer):
    wallet = SimpleCreditCardSerializer(many = True)
