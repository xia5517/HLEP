# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-20 14:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LoveHelp', '0009_auto_20170214_2145'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='status',
            field=models.CharField(default='False', max_length=10),
        ),
    ]
