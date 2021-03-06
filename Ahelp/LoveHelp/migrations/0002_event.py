# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-22 07:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LoveHelp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='event',
            fields=[
                ('id', models.CharField(max_length=8, primary_key=True, serialize=False)),
                ('publish_time', models.CharField(max_length=20)),
                ('publisher', models.CharField(max_length=10)),
                ('title', models.CharField(max_length=50)),
                ('content', models.CharField(max_length=200)),
                ('status', models.BooleanField(default='False')),
                ('receiver', models.CharField(default='', max_length=10, null=True)),
                ('receive_time', models.CharField(max_length=20, null=True)),
                ('event_Img', models.ImageField(default='', null=True, upload_to=b'')),
                ('addr', models.TextField(default='')),
                ('money', models.IntegerField(default=1)),
            ],
        ),
    ]
