from django.test import TestCase
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