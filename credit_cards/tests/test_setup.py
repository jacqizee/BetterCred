from django.test import TestCase
from ..views import CreditCard
from issuers.models import Issuer
from networks.models import Network
from credit_ranges.models import CreditRange

class TestCreditCards(TestCase):
    def setUp(self):
        Issuer.objects.create(
            name="Discover Express",
            logo="https://cdn.valuedmerchants.com/wp-content/uploads/2016/06/wsi-imageoptim-credit-card-logos.jpg",
            link="https://www.valuedmerchants.com/the-biggest-credit-card-companies-and-how-they-got-there"
        )
        Network.objects.create(name="New Network", logo="https://logo-url.com")
        CreditRange.objects.create(range="Excellent")

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
            issuer = Issuer.objects.get(name="Discover Express"),
            network = Network.objects.get(name="New Network"),
            credit_range = CreditRange.objects.get(range="Excellent")
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
            issuer = Issuer.objects.get(name="Discover Express"),
            network = Network.objects.get(name="New Network"),
            credit_range = CreditRange.objects.get(range="Excellent")
        )