from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

# For tokenization
import jwt
from django.conf import settings

# DateTime for Token
from datetime import datetime, timedelta

# Serializers
from .serializers.common import UserSerializer

# User Model
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.

# Endpoint: /register/
# Methods: POST
class RegisterView(APIView):
    
    # POST - register a user
    def post(self, request):
        user_to_register = UserSerializer(data = request.data)

        try:
            user_to_register.is_valid()
            user_to_register.save()
            return Response({ 'message': 'Registration successful!' }, status.HTTP_201_CREATED)
        except Exception as e:
            return Response({ 'message': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

# Endpoint: /login/
# Methods: POST
class LoginView(APIView):

    # POST - Login a user and return a token
    def post(self, request):

        # Save username and password from request to variables
        username = request.data.get('username')
        password = request.data.get('password')

        # Try to find user, if not found, return an ambiguous error
        try:
            user_to_login = User.objects.get(username = username)
        except User.DoesNotExist:
            raise PermissionDenied('Invalid credentials.')
        
        # If user is found but password does not match, return error
        if not User.check_password(user_to_login, password):
            raise PermissionDenied('Invalid credentials.')
        
        # ? Now that the username/password checks out, we can create and return a token
        # Get time one week for now for use in token exp
        exp_time = datetime.now() + timedelta(weeks = 1)

        # Encode token using jwt
        token = jwt.encode(
            {
                'sub': user_to_login.id,
                'exp': int(exp_time.strftime('%S')),
            }, 
            settings.SECRET_KEY,
            'HS256'
        )

        # Return response with token
        return Response(
            { 
                'message': f'Welcome back {user_to_login.name}!',
                'token': token,
            },
            status.HTTP_202_ACCEPTED
        )

# Endpoint: /profile/<int:pk>
# Methods: PUT, DELETE
class ProfileView(APIView):

    # Method - Find and returns a user or raises a DoesNotExist error
    def get_user(self, pk):
        try:
            return User.objects.get(pk = pk)
        except User.DoesNotExist:
            raise Response({ 'message': 'User not found.'}, status.HTTP_422_UNPROCESSABLE_ENTITY)

    # PUT - Update user profile
    def put(self, request, pk):
        user_to_edit = self.get_user(pk)
        deserialized_user = UserSerializer(user_to_edit, request.data)
        try:
            deserialized_user.is_valid()
            deserialized_user.save()
            return Response(deserialized_user.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response({ "error": e }, status.HTTP_422_UNPROCESSABLE_ENTITY)


    # DELETE - Delete user profile
    def delete(self, _request, pk):
        user_to_delete = self.get_user(pk)
        user_to_delete.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)