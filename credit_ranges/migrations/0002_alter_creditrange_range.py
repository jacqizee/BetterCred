# Generated by Django 4.0.6 on 2022-07-29 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credit_ranges', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creditrange',
            name='range',
            field=models.CharField(max_length=35, unique='True'),
        ),
    ]