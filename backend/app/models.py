# app/models.py

from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ATemp(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    e_report = models.CharField(max_length=255)
    caller_number = models.CharField(max_length=255)
    called_number = models.CharField(max_length=255)
    third_party_number = models.CharField(max_length=255)
    call_initial_time = models.DateTimeField()
    conversation_duration = models.IntegerField()
    city = models.CharField(max_length=255)
    site_name = models.CharField(max_length=255)
    charged_mobile_user_imei = models.CharField(max_length=255)
    charged_mobile_user_imsi = models.CharField(max_length=255)
    lon = models.FloatField()
    lat = models.FloatField()
    site_id = models.CharField(max_length=255)
    cgi = models.CharField(max_length=255)

class ZTemp(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    date = models.DateTimeField()
    call_type = models.CharField(max_length=255)
    duration = models.IntegerField()
    calling_number = models.CharField(max_length=255)
    called_number = models.CharField(max_length=255)
    call_location = models.CharField(max_length=255)
    site_id = models.CharField(max_length=255)
    split = models.CharField(max_length=255)

class KTemp(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    call_type = models.CharField(max_length=255)
    msisdn = models.CharField(max_length=255)
    imsi = models.CharField(max_length=255)
    b_party_msisdn = models.CharField(max_length=255)
    duration = models.IntegerField()
    callingnumber = models.CharField(max_length=255)
    callednumber = models.CharField(max_length=255)
    imei = models.CharField(max_length=255)
    call_location = models.CharField(max_length=255)
    site_id = models.CharField(max_length=255)
    site = models.CharField(max_length=255)
    governorate = models.CharField(max_length=255)
    longitude = models.FloatField()
    latitude = models.FloatField()

class Archive(models.Model):
    phone_number = models.CharField(max_length=255)
    name_info = models.CharField(max_length=255)
    bookid = models.CharField(max_length=255)
    app_book_date = models.DateTimeField()
    received_from = models.CharField(max_length=255)
    accused_char = models.CharField(max_length=255)
    app_form = models.CharField(max_length=255)
    app_date = models.DateTimeField()
    period_fromto = models.CharField(max_length=255)
    tech_name = models.CharField(max_length=255)
    app_kind = models.CharField(max_length=255)

class Dispatch(models.Model):
    name_accused = models.CharField(max_length=255)
    saved_numbers = models.CharField(max_length=255)
    saved_name = models.CharField(max_length=255)
    saved_info = models.CharField(max_length=255)
    city = models.CharField(max_length=255)

