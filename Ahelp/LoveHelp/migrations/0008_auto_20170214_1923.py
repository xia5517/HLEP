# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-14 11:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LoveHelp', '0007_auto_20170210_1739'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_Img',
            field=models.CharField(default='', max_length=300, null=True),
        ),
    ]
