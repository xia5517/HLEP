# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-21 12:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LoveHelp', '0014_auto_20170221_2033'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='pub_status',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='rec_status',
            field=models.BooleanField(default=False),
        ),
    ]
