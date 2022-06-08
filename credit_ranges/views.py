from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import CreditRange
from .serializers.common import CreditRangeSerializer

# Create your views here.

class CashBackView(APIView):

    # GET Request - return all cash back categories
    def get(self, _request):
        serialized_categories = CreditRangeSerializer(CreditRange.objects.all(), many=True)
        return Response(serialized_categories.data)