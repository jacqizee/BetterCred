from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import CashBackCategory
from .serializers.common import CashBackSerializer

# Create your views here.

class CashBackView(APIView):

    # GET Request - return all cash back categories
    def get(self, _request):
        serialized_categories = CashBackSerializer(CashBackCategory.objects.all(), many=True)
        return Response(serialized_categories.data)