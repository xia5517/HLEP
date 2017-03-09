"""Ahelp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from LoveHelp.views import home
from LoveHelp.views import pub
from LoveHelp.views import per
from LoveHelp.views import eve
from LoveHelp.views import change_p
from LoveHelp.views import disp_page

from LoveHelp.views import sign
from LoveHelp.views import login
from LoveHelp.views import upload_imgs
from LoveHelp.views import upload_event
from LoveHelp.views import upload_events
from LoveHelp.views import change_img
from LoveHelp.views import query_personal_info
from LoveHelp.views import change_user_info
from LoveHelp.views import receive_event
from LoveHelp.views import rec_cancel_eve
from LoveHelp.views import rec_confirm_eve
from LoveHelp.views import pub_confirm_eve
from LoveHelp.views import pub_cancel_eve


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^index/', home),
    url(r'^events/', eve),
    url(r'^publish/', pub),
    url(r'^person/', per),
    url(r'^change_per/', change_p),
    url(r'^page/', disp_page),

    url(r'^login/', login),
    url(r'^sign/', sign),
    url(r'^upload-img/', upload_imgs),
    url(r'^upload-event/', upload_event),
    url(r'^event/', upload_events),
    url(r'^change_por', change_img),
    url(r'^query_person_info/', query_personal_info),
    url(r'^change_per_info/', change_user_info),
    url(r'^receive/', receive_event),
    url(r'^rec_cancel/', rec_cancel_eve),
    url(r'^pub_cancel/', pub_cancel_eve),
    url(r'^rec_confirm/', rec_confirm_eve),
    url(r'^pub_confirm/', pub_confirm_eve),
]
