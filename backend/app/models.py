from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class a_temp(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    e_report = models.CharField(max_length=255)
    caller_number = models.CharField(max_length=20)
    called_number = models.CharField(max_length=20)
    third_party_number = models.CharField(max_length=20, blank=True, null=True)
    call_initial_time = models.DateTimeField()
    conversation_duration = models.IntegerField()
    city = models.CharField(max_length=100)
    site_name = models.CharField(max_length=100)
    charged_mobile_user_imei = models.CharField(max_length=100)
    charged_mobile_user_imsi = models.CharField(max_length=100)
    lon = models.FloatField()
    lat = models.FloatField()
    site_id = models.CharField(max_length=100)
    cgi = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.e_report

class z_temp(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    date = models.DateTimeField()
    call_type = models.CharField(max_length=50)
    duration = models.IntegerField()
    calling_number = models.CharField(max_length=20)
    called_number = models.CharField(max_length=20)
    call_location = models.CharField(max_length=100)
    site_id = models.CharField(max_length=100)
    split = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.calling_number

class k_temp(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    call_type = models.CharField(max_length=50)
    msisdn = models.CharField(max_length=20)
    imsi = models.CharField(max_length=100)
    b_party_msisdn = models.CharField(max_length=20)
    duration = models.IntegerField()
    calling_number = models.CharField(max_length=20)
    called_number = models.CharField(max_length=20)
    imei = models.CharField(max_length=100)
    call_location = models.CharField(max_length=100)
    site_id = models.CharField(max_length=100)
    site = models.CharField(max_length=100)
    governorate = models.CharField(max_length=100)
    longitude = models.FloatField()
    latitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.msisdn
