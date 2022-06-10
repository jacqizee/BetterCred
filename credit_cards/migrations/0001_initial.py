# Generated by Django 4.0.5 on 2022-06-10 16:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cash_back_categories', '0001_initial'),
        ('credit_ranges', '0001_initial'),
        ('issuers', '0001_initial'),
        ('networks', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CreditCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('image', models.CharField(max_length=500)),
                ('link', models.CharField(max_length=500)),
                ('annual_fee', models.IntegerField(default=None)),
                ('foreign_fee', models.FloatField(max_length=5)),
                ('base_reward_rate', models.FloatField(max_length=5)),
                ('regular_APR_min', models.FloatField(max_length=5)),
                ('regular_APR_max', models.FloatField(max_length=5)),
                ('pro_1', models.CharField(blank=True, max_length=75)),
                ('pro_2', models.CharField(blank=True, max_length=75)),
                ('pro_3', models.CharField(blank=True, max_length=75)),
                ('con_1', models.CharField(blank=True, max_length=75)),
                ('con_2', models.CharField(blank=True, max_length=75)),
                ('con_3', models.CharField(blank=True, max_length=75)),
                ('cash_back_category', models.ManyToManyField(blank=True, related_name='credit_cards', to='cash_back_categories.cashbackcategory')),
                ('credit_range', models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, related_name='credit_cards', to='credit_ranges.creditrange')),
                ('issuer', models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, related_name='credit_cards', to='issuers.issuer')),
                ('network', models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, related_name='credit_cards', to='networks.network')),
            ],
        ),
    ]
