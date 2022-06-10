from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Network
from .serializers.common import NetworkSerializer
from .serializers.populated import PopulatedNetworkSerializer

# Create your views here.

class NetworkView(APIView):

    # GET Request - return all networks
    def get(self, _request):
        serialized_networks = PopulatedNetworkSerializer(Network.objects.all(), many=True)
        return Response(serialized_networks.data)