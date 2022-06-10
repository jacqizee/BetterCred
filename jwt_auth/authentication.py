from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied

from django.conf import settings

import jwt

from django.contrib.auth import get_user_model
User = get_user_model()

class JWTAuthentication(BasicAuthentication):

    #  Defining authenticate method
    def authenticate(self, request):
        # Get header from request
        auth_header = request.headers.get('Authorization')

        #  If header not found, return
        if not auth_header:
            return None

        # If token is not correct format, raise error
        if not auth_header.startswith('Bearer '):
            raise PermissionDenied('Token is invalid.')

        # If token is valid, replace Bearer so we can use the token
        token = auth_header.replace('Bearer ', '')

        #  Decode the token and save the user to a variable
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, ['HS256'])
            user = User.objects.get(pk = payload.get('sub'))
        except jwt.InvalidTokenError:
            raise PermissionDenied('Token is invalid.')
        except User.DoesNotExist:
            raise PermissionDenied('User not found.')

        return (user, token)