from ..views import CreditCard
from .test_setup import TestCreditCards
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

class TestCreditCardsView(TestCreditCards):
    def setUp(self):
        super(TestCreditCardsView, self).setUp()
        self.req_url = reverse('all-credit-cards')
        self.username = 'JohnnyBoy'
        self.password = 'pass123'
        self.user = get_user_model().objects.create(username = self.username, password = self.password)
        
    def test_all_cards_GET(self):
        # Test Client GET Request Returns All Cards
        response = self.client.get(self.req_url)
        self.assertEqual(len(response.data), 2)
    
    def test_one_card_not_authenticated_GET(self):
        # Test Un-Authenticated Client Recieves Auth Error
        card = CreditCard.objects.get(name = 'Testing 1')
        response = self.client.get(self.req_url + f'{card.pk}/')
        self.assertEqual(response.status_code, 401)

    def test_one_card_authenticated_GET(self):
        # Test Authenticated Client Request Returns One Card
        card = CreditCard.objects.get(name = 'Testing 1')
        client = APIClient()
        client.force_authenticate(user = get_user_model().objects.get(username = self.username))
        response = client.get(f'/api/credit/{card.pk}/')

        self.assertEqual(response.status_code, 200)