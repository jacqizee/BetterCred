from django.test import TestCase, Client
from django.urls import reverse
from .models import User

# Create your tests here.

class TestUsers(TestCase):
    def setUp(self):
        user = User.objects.create(
            email = "email@gmail.com",
            first_name = "John",
            last_name = "Smith",
        )

    def test_user(self):
        user = User.objects.get(first_name = "John")
        self.assertEqual(user.last_name, "Smith")

    def test_user_register_POST(self):
        # Test that Register Works
        response = self.client.post(reverse('user-register'), {
            'username': 'user123',
            'password': 'hellothere123!',
            'password_confirmation': 'hellothere123!',
            'email': 'email123@gmail.com',
            'first_name': 'Bill',
            'last_name': 'Gates',
        }, format='json')
        self.assertEqual(response.status_code, 201)

        # Test that Register Passwords Must Match
        response = self.client.post(reverse('user-register'), {
            'username': 'user123',
            'password': 'hellothere!',
            'password_confirmation': 'hellothere123!',
            'email': 'email123@gmail.com',
            'first_name': 'Bill',
            'last_name': 'Gates',
        }, format='json')
        self.assertEqual(response.status_code, 422)