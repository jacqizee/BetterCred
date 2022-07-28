from django.test import TestCase, Client
from django.urls import reverse
from ..models import User

# Create your tests here.

class TestUsers(TestCase):
    def setUp(self):
        user = User.objects.create(
            username = 'JohnnyBoy',
            email = "email@gmail.com",
            first_name = "John",
            last_name = "Smith",
        )
        user.set_password('pass123!')
        user.save()
    
    def test_user(self):
        user = User.objects.get(first_name = "John")
        self.assertEqual(user.last_name, "Smith")

    def test_user_register_POST(self):
        req_url = reverse('user-register')
        user_details = {
            'username': 'user123',
            'password': 'hellothere123!',
            'password_confirmation': 'hellothere123!',
            'email': 'email123@gmail.com',
            'first_name': 'Bill',
            'last_name': 'Gates',
        }

        # Test that Register Works
        response = self.client.post(req_url, {
            **user_details
        })
        self.assertEqual(response.status_code, 201)

        # Test that Register Passwords Must Match
        response = self.client.post(req_url, {
            **user_details,
            'password': 'does-not-match',
        })
        self.assertEqual(response.status_code, 422)

        # Test that Duplicate Emails are Not Allowed
        response = self.client.post(req_url, {
            **user_details,
            'email': 'email@gmail.com'
        })
        self.assertEqual(response.status_code, 422)

    def test_user_login_POST(self):
        req_url = reverse('user-login')
        login_details = {
            'username': 'JohnnyBoy',
            'password': 'pass123!'
        }

        response = self.client.post(req_url, login_details)
        self.assertEqual(response.status_code, 202)
        self.assertTrue(response.data['token'])

    def test_user_login_wrong_details_POST(self):
        req_url = reverse('user-login')
        login_details = {
            'username': 'JohnnyBoy',
            'password': 'passs123!'
        }

        response = self.client.post(req_url, login_details)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data.get('detail'), 'Invalid credentials.')