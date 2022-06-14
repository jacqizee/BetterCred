from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound

from .models import CreditCard
from .serializers.common import CreditCardSerializer
from .serializers.populated import PopulatedCreditCardSerializer

# Create your views here.

class AllCreditCardView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    # GET request - returns all credit cards
    def get(self, _request):
        serialized_credit_cards = CreditCardSerializer(CreditCard.objects.all(), many=True)
        return Response(serialized_credit_cards.data)
    
class OneCreditCardView(APIView):
    permission_classes = (IsAuthenticated, )

    # Method that returns found credit card or raises an error
    def get_credit_card(self, pk):
        try:
            return CreditCard.objects.get(pk = pk)
        except CreditCard.DoesNotExist:
            raise NotFound('Card not found. :(')

    # GET request - returns a card
    def get(self, _request, pk):
        card = self.get_credit_card(pk)
        serialized_card = PopulatedCreditCardSerializer(card)
        return Response(serialized_card.data)
