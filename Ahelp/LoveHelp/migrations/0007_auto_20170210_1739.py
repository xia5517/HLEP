# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-10 09:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LoveHelp', '0006_auto_20170210_1732'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='publish_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='receive_time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]