# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-21 01:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LoveHelp', '0010_auto_20170220_2255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='status',
            field=models.CharField(default='false', max_length=10),
        ),
    ]
