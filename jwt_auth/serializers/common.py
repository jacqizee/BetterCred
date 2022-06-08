from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # Add write_only fields to the serializer for password + password_confirmation fields
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        # Pop passwords off the data and store them in variables
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        
        # Check if passwords match, if not raise a ValidationError
        if password != password_confirmation:
            raise ValidationError({ 'error': 'Passwords do not match' })

        # Once we confirm passwords match, validate password strength

        try:
            password_validation.validate_password(password)
        except ValidationError as e:
            raise ValidationError({ 'error': e.messages })

        # Save hashed password to data
        data['password'] = make_password(password)

        # Return data
        return data

    class Meta:
        model = User
        fields = '__all__'