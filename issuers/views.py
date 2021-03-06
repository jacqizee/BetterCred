from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .models import Issuer
from .serializers.common import IssuerSerializer
from .serializers.populated import PopulatedIssuerSerializer


# Create your views here.

class IssuerView(APIView):

    # GET Request - return all issuers
    def get(self, _request):
        serialized_issuers = PopulatedIssuerSerializer(Issuer.objects.all(), many=True)
        return Response(serialized_issuers.data)