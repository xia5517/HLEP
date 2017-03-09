from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from LoveHelp.models import user
from LoveHelp.models import event
import datetime
from PIL import Image
import time
import json
import urlparse
# Create your views here.

def home(request):
    return render(request, 'index.html')
def pub(request):
    return render(request, 'publish.html')
def per(request):
    return render(request, 'person.html')
def eve(request):
    return render(request, 'events.html')
def change_p(request):
    return render(request, 'change_per.html')


def disp_page(request):
    id = request.GET.get("id")
    result = {}
    try:
        event_info = event.objects.filter(num=id)
        data = serializers.serialize("json", event_info)
        result["succ"] = "true"
        result["data"] = data
    except:
        result["succ"] = "false"
        print "error"
    return render(request, 'page.html', {
        'data': json.dumps(result),
    })




def login(request):
    if request.method == 'POST':
        username = request.POST["username"]
        pwd = request.POST["pwd"]
        try:
            usr = user.objects.get(username=username, pwd=pwd)
            return HttpResponse(json.dumps({"result": "true"}), content_type="application/json")
        except:
            return HttpResponse(json.dumps({"result": "false"}), content_type="application/json")




def sign(request):
    if request.method == 'POST':
        username = request.POST["user"]
        pwd = request.POST["pwd"]
        email = request.POST["email"]
    try:
        usr = user.objects.get(username=username)
        return HttpResponse(json.dumps({"result": "done"}), content_type="application/json")
    except:
        try:
            new_user = user(username=username, pwd=pwd, email=email)
            new_user.save()
            return HttpResponse(json.dumps({"result": "true"}), content_type="application/json")
        except:
            return HttpResponse(json.dumps({"result": "false"}), content_type="application/json")



import string
import random

def base_str():
    return (string.letters+string.digits)
def key_gen():
    keylist = [random.choice(base_str()) for i in range(8)]
    return ("".join(keylist))

def random_key():
   num = key_gen()
   if (event.objects.filter(num=num)):
       return  random_key()
   else:
       return num



def upload_imgs(request):
 if request.method == 'POST':
     try:
         num = random_key()
         title = request.POST["publish_title"]
         content = request.POST["publish_content"]
         publisher = request.POST["publisher"]
         money = int(request.POST["publish_money"])
         try:
             reqfile = request.FILES
             event_img = ""
             user_info = user.objects.get(username=publisher)
             user_info.property = user_info.property - money
             print user_info.property
             for key in reqfile:
                 image = reqfile[key]
                 img = Image.open(image)
                 img.thumbnail((500, 500), Image.ANTIALIAS)
                 ss = time.strftime("%Y%m%d%H%M%S", time.localtime(time.time()))
                 img.save("static/upload/" + ss + image.name)
                 event_str = ss + image.name
                 event_img = event_img +event_str+","
                 new_event = event(num=num, title=title, content=content, publisher=publisher, event_Img=event_img,
                                   money=money)
         except:
             new_event = event(num=num, title=title, content=content, publisher=publisher, money=money)
         new_event.save()
         user_info.save()
         return HttpResponse("ok")
     except Exception, e:
         return HttpResponse("Error %s" % e)

from django.core import serializers
def upload_event(request):
    obj = event.objects.order_by('status','-publish_time')
    data = serializers.serialize("json", obj)
    event_info = {}
    event_info["data"] = json.loads(data)
    return HttpResponse(json.dumps(event_info))


def upload_events(request):
    obj = event.objects.order_by('-publish_time')
    data = serializers.serialize("json", obj)
    event_info = {}
    event_info["data"] = json.loads(data)
    return HttpResponse(json.dumps(event_info))


def change_img(request):
    if request.method == 'POST':
        user = request.POST["user"]
        usr = user.objects.get(username=user)
        try:
            reqfile = request.FILES
            img = Image.open(reqfile)
            img.thumbnail((500, 500), Image.ANTIALIAS)
            img.save("static/por/" + user + reqfile.name)
            por = user + reqfile.name
        except:
            por = "por5.jpg"
        usr.por = por
        usr.save()
        img_src = {}
        img_src[img] = por
        return HttpResponse(json.dumps(img_src))

def change_user_info(request):
    if request.method == 'POST':
        data = request.POST
        returnData = {}
        username = data["username"]
        try:
            usr = user.objects.get(username=username)
            usr.age=data["age"]
            usr.tel=data["tel"]
            usr.sex=data["sex"]
            usr.pwd = data["pwd"]
            usr.email=data["email"]
            usr.save()
            returnData["result"] = "succ"
        except:
            returnData["result"] = "fail"
        return HttpResponse(json.dumps(returnData))

def query_personal_info(request):
    if request.method == 'POST':
        person = request.POST["user"]
        usr = user.objects.filter(username=person)
        pub = event.objects.filter(publisher=person)
        rec = event.objects.filter(receiver=person)
        user_data = serializers.serialize("json", usr)
        pub_data = serializers.serialize("json", pub)
        rec_data = serializers.serialize("json", rec)
        user_info = {}
        user_info["user"] = json.loads(user_data)
        user_info["pub"] = json.loads(pub_data)
        user_info["rec"] = json.loads(rec_data)
        return HttpResponse(json.dumps(user_info))


def receive_event(request):
    if request.method == 'POST':
        event_id = request.POST["event"]
        user_id = request.POST["username"]
        eve = event.objects.get(num=event_id)
        eve.receiver = user_id
        eve.status = "ing"
        eve.save()
        data = {'id': event_id}
        return HttpResponse(json.dumps(data))


def rec_cancel_eve(request):
    if request.method == 'POST':
        event_id = request.POST["event"]
        eve = event.objects.get(num=event_id)
        eve.receiver = ""
        eve.status = "false"
        eve.save()
        data = {'id': event_id}
        return HttpResponse(json.dumps(data))

def pub_cancel_eve(request):
    if request.method == 'POST':
        event_id = request.POST["event"]
        user_id = request.POST['username']
        usr = user.objects.get(username=user_id)
        eve = event.objects.get(num=event_id)
        usr.property = usr.property + eve.money
        eve.delete()
        data= {"result":"true"}
        return HttpResponse(json.dumps(data))


def pub_confirm_eve(request):
    if request.method == 'POST':
        event_id = request.POST["event"]
        user_id = request.POST["username"]
        eve = event.objects.get(num=event_id)
        usr = user.objects.get(username=user_id)
        if (eve.rec_status == True):
            usr.property = usr.property+eve.money
            eve.status = "rue"
        eve.pub_status = True
        eve.save()
        data = {'id': event_id}
        return HttpResponse(json.dumps(data))

def rec_confirm_eve(request):
    if request.method == 'POST':
        event_id = request.POST["event"]
        user_id = request.POST["username"]
        eve = event.objects.get(num=event_id)
        usr = user.objects.get(username=user_id)
        if (eve.pub_status == True):
            print 111
            usr.property = usr.property+eve.money
            eve.status = "true"
        eve.rec_status = True
        eve.save()
        data = {'id': event_id}
        return HttpResponse(json.dumps(data))