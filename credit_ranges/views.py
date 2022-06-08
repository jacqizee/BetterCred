from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import CreditRange
from .serializers.common import CreditRangeSerializer

# Create your views here.

class CreditRangeView(APIView):

    # GET Request - return all credit ranges
    def get(self, _request):
        serialized_ranges = CreditRangeSerializer(CreditRange.objects.all(), many=True)
        return Response(serialized_ranges.data)