# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2017-03-02 11:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LoveHelp', '0018_auto_20170302_0302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='pub_status',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='event',
            name='rec_status',
            field=models.BooleanField(default=False),
        ),
    ]
