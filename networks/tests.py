from django.test import TestCase
from django.urls import reverse
from .models import Network

# Create your tests here.
class TestNetworks(TestCase):
    def setUp(self):
        Network.objects.create(name="New Network", logo='https://logo-url.com')
        Network.objects.create(name="New Network 2", logo='https://logo-url2.com')
        self.req_url = reverse('networks')

    def test_name(self):
        network = Network.objects.get(name="New Network")
        self.assertEqual(network.logo, "https://logo-url.com")

    def test_get_networks(self):
        # Test that GET request returns networks
        response = self.client.get(self.req_url)
        self.assertEqual(len(response.data), 2)

        # The HTTP request status code
        self.assertEqual(response.status_code, 200)

        # Check the populated Credit Card field is present
        self.assertTrue('credit_cards' in response.data[0].keys())