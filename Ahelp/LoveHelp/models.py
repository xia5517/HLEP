from __future__ import unicode_literals

from django.db import models
import json
# Create your models here.

class user(models.Model):
    username = models.CharField(null=False, max_length=10, primary_key=True)
    pwd = models.CharField(null=False, max_length=18)
    sex = models.CharField(max_length=5, default="")
    age = models.IntegerField(default=0)
    por = models.CharField(default="",max_length=30,null=True)
    email = models.CharField(null=False, max_length=20)
    tel = models.CharField(default="", max_length=15)
    property = models.IntegerField(default=10)
    def __str__(self):
        return self.username
    def toJson(self):
        dic = dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]])
        return json.dumps(dic)

class event(models.Model):
    num = models.CharField(null=False, primary_key=True, max_length=8)
    publish_time = models.DateTimeField(auto_now=True, null=False)
    publisher = models.CharField(null=False, max_length=10)
    title = models.CharField(null=False, max_length=50)
    content = models.CharField(null=False, max_length=200)
    status = models.CharField(null=False,max_length=10, default="false")
    receiver = models.CharField(null=True, max_length=10, default="")
    receive_time = models.DateTimeField(auto_now_add=True, null=True)
    event_Img = models.CharField(null=True, max_length=300, default="")
    money = models.IntegerField(default=1)
    pub_status = models.BooleanField(default="False")
    rec_status = models.BooleanField(default="False")
    def __str__(self):
        return self.num





