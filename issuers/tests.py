from django.test import TestCase
from .models import Issuer

# Create your tests here.
class TestIssuer(TestCase):
    def setUp(self):
        issuer = Issuer.objects.create(
            name="Discover Express",
            logo="https://cdn.valuedmerchants.com/wp-content/uploads/2016/06/wsi-imageoptim-credit-card-logos.jpg",
            link="https://www.valuedmerchants.com/the-biggest-credit-card-companies-and-how-they-got-there"
        )

    def tearDown(self):
        pass

    def test_name(self):
        issuer = Issuer.objects.get(name="Discover Express")
        self.assertEqual(issuer.name, "Discover Express")

    def test_logo(self):
        issuer = Issuer.objects.get(name="Discover Express")
        self.assertEqual(issuer.logo, "https://cdn.valuedmerchants.com/wp-content/uploads/2016/06/wsi-imageoptim-credit-card-logos.jpg")

    def test_link(self):
        issuer = Issuer.objects.get(name="Discover Express")
        self.assertEqual(issuer.link, "https://www.valuedmerchants.com/the-biggest-credit-card-companies-and-how-they-got-there")