# Generated by Django 4.0.6 on 2022-07-29 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('issuers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issuer',
            name='name',
            field=models.CharField(max_length=25, unique=True),
        ),
    ]
