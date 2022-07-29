from django.test import TestCase
from django.urls import reverse
from ..models import CreditCard
from issuers.models import Issuer
from networks.models import Network
from credit_ranges.models import CreditRange

class TestCreditCardsView(TestCase):
    def setUp(self):
        CreditCard.objects.create(
            name = "Testing 1",
            image = "image_link",
            link = "card_link",
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
                logo="logo_image_link",
                link="issuer_link"
            ),
            network = Network.objects.create(name="New Network", logo="https://logo-url.com"),
            credit_range = CreditRange.objects.create(range="Excellent"),
        )