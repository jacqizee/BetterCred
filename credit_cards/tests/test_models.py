from ..views import CreditCard
from .test_setup import TestCreditCards

# Create your tests here.
class TestCreditCardModel(TestCreditCards):
    
    def test_model(self):
        # Test the models we created were successfully made
        test_card_1 = CreditCard.objects.get(name="Testing 1")
        self.assertEqual(test_card_1.name, "Testing 1")
        self.assertEqual(CreditCard.objects.count(), 2)