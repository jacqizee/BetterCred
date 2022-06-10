# Generated by Django 4.0.5 on 2022-06-09 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_back_categories', '0001_initial'),
        ('credit_cards', '0004_rename_regular_apr_creditcard_regular_apr_max_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creditcard',
            name='cash_back_category',
            field=models.ManyToManyField(blank=True, related_name='credit_cards', to='cash_back_categories.cashbackcategory'),
        ),
    ]