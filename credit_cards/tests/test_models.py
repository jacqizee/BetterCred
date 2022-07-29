from django.test import TestCase
from ..views import CreditCard
from issuers.models import Issuer
from networks.models import Network
from credit_ranges.models import CreditRange

# Create your tests here.
class TestCreditCards(TestCase):
    def setUp(self):
        CreditCard.objects.create(
            name = "Testing 1",
            image = "https://cdn.wallethub.com/common/product/images/creditcards/500/chase-freedom-unlimited-10082293c.png",
            link = "https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited?CELL = 6TKV",
            annual_fee = 0,
            foreign_fee = 0,
            base_reward_rate = 1.25,
            regular_APR_min = 15.00,
            regular_APR_max = 25,
            pro_1 = "Pro 1",
            pro_2 = "Pro 2",
            pro_3 = "Pro 3",
            con_1 = "Con 1",
            con_2 = "Con 2",
            con_3 = "Con 3",
            issuer = Issuer.objects.create(
                name="Discover Express",
                logo="https://cdn.valuedmerchants.com/wp-content/uploads/2016/06/wsi-imageoptim-credit-card-logos.jpg",
                link="https://www.valuedmerchants.com/the-biggest-credit-card-companies-and-how-they-got-there"
            ),
            network = Network.objects.create(name="New Network", logo="https://logo-url.com"),
            credit_range = CreditRange.objects.create(range="Excellent"),
        )
        CreditCard.objects.create(
            name = "Testing 2",
            image = "https://cdn.wallethub.com/common/product/images/creditcards/500/chase-freedom-unlimited-10082293c.png",
            link = "https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited?CELL = 6TKV",
            annual_fee = 0,
            foreign_fee = 0,
            base_reward_rate = 1.25,
            regular_APR_min = 15.00,
            regular_APR_max = 25,
            pro_1 = "Pro 1",
            pro_2 = "Pro 2",
            pro_3 = "Pro 3",
            con_1 = "Con 1",
            con_2 = "Con 2",
            con_3 = "Con 3",
            issuer = Issuer.objects.create(
                name="Discover Express",
                logo="https://cdn.valuedmerchants.com/wp-content/uploads/2016/06/wsi-imageoptim-credit-card-logos.jpg",
                link="https://www.valuedmerchants.com/the-biggest-credit-card-companies-and-how-they-got-there"
            ),
            network = Network.objects.create(name="New Network", logo="https://logo-url.com"),
            credit_range = CreditRange.objects.create(range="Excellent"),
        )
    
    def test_model(self):
        test_card_1 = CreditCard.objects.get(name="Testing 1")
        self.assertEqual(test_card_1.name, "Testing 1")
        self.assertEqual(CreditCard.objects.count(), 2)

    def test_no_duplicate_names(self):
        self.assertFalse(CreditCard.objects.create(
            name = 'Testing 1',
            image = 'image',
            link = 'link',
            annual_fee = 50,
            foreign_fee = 2.5,
            base_reward_rate = 2.5,
            regular_APR_min = 24.6,
            regular_APR_max = 50.6,
            credit_range = CreditRange.objects.get(range='Excellent'),
            network = Network.objects.get(name='New Network'),
            issuer = Issuer.objects.get(name='Discover Express')
        ))