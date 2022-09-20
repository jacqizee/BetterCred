from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination

from .models import CreditCard
from .serializers.common import CreditCardSerializer, SimpleCreditCardSerializer
from .serializers.populated import PopulatedCreditCardSerializer

# Create your views here.

class CreditCardPagination(PageNumberPagination):
    page_size = 12

class AllCreditCardView(APIView, CreditCardPagination):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    # GET request - returns all credit cards
    def get(self, request):
        cards = CreditCard.objects.all()
        paginate_cards = self.paginate_queryset(cards, request, view=self)
        serialized_credit_cards = SimpleCreditCardSerializer(paginate_cards, many=True)
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
