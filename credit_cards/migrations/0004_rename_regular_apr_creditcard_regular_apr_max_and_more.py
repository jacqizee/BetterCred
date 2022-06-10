# Generated by Django 4.0.5 on 2022-06-09 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credit_cards', '0003_creditcard_issuer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='creditcard',
            old_name='regular_APR',
            new_name='regular_APR_max',
        ),
        migrations.AddField(
            model_name='creditcard',
            name='regular_APR_min',
            field=models.FloatField(default=None, max_length=5),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='con_1',
            field=models.CharField(blank=True, max_length=75),
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='con_2',
            field=models.CharField(blank=True, max_length=75),
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='con_3',
            field=models.CharField(blank=True, max_length=75),
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='pro_1',
            field=models.CharField(blank=True, max_length=75),
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='pro_2',
            field=models.CharField(blank=True, max_length=75),
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='pro_3',
            field=models.CharField(blank=True, max_length=75),
        ),
    ]