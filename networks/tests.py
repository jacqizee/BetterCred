from django.test import TestCase
from .models import Network

# Create your tests here.
class TestNetworks(TestCase):
    def setUp(self):
        network = Network.objects.create(name="New Network", logo='https://logo-url.com')

    def test_name(self):
        network = Network.objects.get(name="New Network")
        self.assertEqual(network.name, "New Network")