from multiprocessing import AuthenticationError
from django.test import TestCase
from django.urls import reverse
from rest_framework.exceptions import PermissionDenied
from rest_framework.test import APIClient
from ..models import User

# Create your tests here.

class TestLogin(TestCase):
    def setUp(self):
        self.req_url = reverse('user-login')

        create_user = User.objects.create(
            username = 'JohnnyBoy',
            email = "email@gmail.com",
            first_name = "John",
            last_name = "Smith",
        )
        create_user.set_password('pass123!')
        create_user.save()

        self.login_details = {
            'username': 'JohnnyBoy',
            'password': 'pass123!'
        }

    def test_user_login_POST(self):
        # Test Login Works and Returns Token
        response = self.client.post(self.req_url, self.login_details)
        self.assertEqual(response.status_code, 202)
        self.assertTrue(response.data['token'])

    def test_user_login_wrong_details_POST(self):
        # Test Login with Incorrect Details Returns Error Code
        response = self.client.post(self.req_url, {
            **self.login_details,
            'username': 'Tomato123'
        })
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data.get('detail'), 'Invalid credentials.')

class TestRegister(TestCase):
    def setUp(self):
        self.req_url = reverse('user-register')
        self.user_details = {
            'username': 'user123',
            'password': 'hellothere123!',
            'password_confirmation': 'hellothere123!',
            'email': 'email123@gmail.com',
            'first_name': 'Bill',
            'last_name': 'Gates',
        }

    def test_user_register_POST(self):
        # Test that Register Works
        response = self.client.post(self.req_url, {
            **self.user_details
        })
        self.assertEqual(response.status_code, 201)

    def test_user_register_mismatched_passwords_POST(self):
        # Test that Register Passwords Must Match
        response = self.client.post(self.req_url, {
            **self.user_details,
            'password': 'hellooo'
        })
        self.assertEqual(response.status_code, 422)

    def test_user_register_duplicate_emails_POST(self):
        # Create a User
        User.objects.create(
            username = 'AnotherUser',
            email = "email123@gmail.com",
            first_name = "Tom",
            last_name = "Hanks",
        )
        # Test that Duplicate Emails are Not Allowed
        response = self.client.post(self.req_url, {
            **self.user_details,
        })
        self.assertEqual(response.status_code, 422)

    def test_user_register_invalid_req_body_POST(self):
        # Test that Invalid Request Body Returns Error
        response = self.client.post(self.req_url, {
            'jello': 'hello there!'
        })
        self.assertEqual(response.status_code, 422)

class TestProfile(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username = 'JohnnyBoy',
            email = "email@gmail.com",
            first_name = "John",
            last_name = "Smith",
        )
        self.other_user = User.objects.create(
            username = 'PicklePete',
            email = "pickleguy@gmail.com",
            first_name = "Pete",
            last_name = "Pickles",
        )
        self.req_url = reverse('user-profile', args=[self.user.id])

    def test_user_profile_not_authenticated_GET(self):
        # Tests that GET will return 401 error if user is not authenticated
        response = self.client.get(self.req_url)
        self.assertEqual(response.status_code, 401)

    def test_user_profile_authenticated_GET(self):
        # Tests that GET will return 200 and populated user profile is user is correct and authenticated
        self.client.force_authenticate(User.objects.get(username=self.user.username))
        response = self.client.get(self.req_url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('wallet' in response.data.keys())

    def test_other_user_profile_authenticated_GET(self):
        # Tests that GET will return 403 if is user is authenticated but id does not match profile id
        self.client.force_authenticate(User.objects.get(username=self.other_user.username))
        response = self.client.get(self.req_url)
        self.assertEqual(response.status_code, 403)

    def test_false_user_profile_authenticated_GET(self):
        # Tests that GET will return 404 if is user is authenticated but profile does not exist
        self.client.force_authenticate(User.objects.get(username=self.user.username))
        response = self.client.get(reverse('user-profile', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_user_profile_edit_PUT(self):
        pass

    def test_user_profile_edit_PUT(self):
        pass

    def test_user_profile_unauthenticated_DELETE(self):
        # Test that delete request will return 401 if user is not authenticated
        response = self.client.delete(self.req_url)
        self.assertEqual(response.status_code, 401)

    def test_user_profile_authenticated_DELETE(self):
        # Tests that delete request for correct user will return 204
        self.client.force_authenticate(User.objects.get(username=self.user.username))
        response = self.client.delete(self.req_url)
        self.assertEqual(response.status_code, 204)

    def test_user_profile_authenticated_DELETE(self):
        # Tests that delete request for incorrect user will return 403
        self.client.force_authenticate(User.objects.get(username=self.other_user.username))
        response = self.client.delete(self.req_url)
        self.assertEqual(response.status_code, 403)

class TestWallet(TestCase):
    def setUp(self):
        self.req_url = reverse('user-wallet')