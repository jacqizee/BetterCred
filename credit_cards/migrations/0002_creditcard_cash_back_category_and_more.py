# Generated by Django 4.0.5 on 2022-06-09 11:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cash_back_categories', '0001_initial'),
        ('credit_ranges', '0001_initial'),
        ('networks', '0001_initial'),
        ('credit_cards', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='creditcard',
            name='cash_back_category',
            field=models.ManyToManyField(default=None, related_name='credit_cards', to='cash_back_categories.cashbackcategory'),
        ),
        migrations.AddField(
            model_name='creditcard',
            name='credit_range',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, related_name='credit_cards', to='credit_ranges.creditrange'),
        ),
        migrations.AddField(
            model_name='creditcard',
            name='network',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, related_name='credit_cards', to='networks.network'),
        ),
    ]