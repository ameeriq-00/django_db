from django.db import models

class Person(models.Model):
    Name = models.CharField(max_length=255)
    PhoneNumber = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Name

class ATemp(models.Model):
    PersonID = models.ForeignKey(Person, related_name='a_temp', on_delete=models.CASCADE)
    E_REPORT = models.CharField(max_length=255)
    CALLER_NUMBER = models.CharField(max_length=255)
    CALLED_NUMBER = models.CharField(max_length=255)
    THIRD_PARTY_NUMBER = models.CharField(max_length=255, default='UNKNOWN')
    CALL_INITIAL_TIME = models.DateTimeField()
    CONVERSATION_DURATION = models.IntegerField()
    CITY = models.CharField(max_length=255)
    SITE_NAME = models.CharField(max_length=255)
    CHARGED_MOBILE_USER_IMEI = models.CharField(max_length=255)
    CHARGED_MOBILE_USER_IMSI = models.CharField(max_length=255)
    LON = models.FloatField()
    LAT = models.FloatField()
    SITE_ID = models.CharField(max_length=255)
    CGI = models.CharField(max_length=255)
    COMMENTS = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.CALLER_NUMBER

class ZTemp(models.Model):
    PersonID = models.ForeignKey(Person, related_name='z_temp', on_delete=models.CASCADE)
    Date = models.DateTimeField()
    CALL_TYPE = models.CharField(max_length=255)
    Duration = models.IntegerField()
    Calling_Number = models.CharField(max_length=255)
    Called_Number = models.CharField(max_length=255)
    Call_Location = models.CharField(max_length=255)
    Site_ID = models.CharField(max_length=255)
    Split = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Calling_Number

class KTemp(models.Model):
    PersonID = models.ForeignKey(Person, related_name='k_temp', on_delete=models.CASCADE)
    DATETIME = models.DateTimeField()
    CALL_TYPE = models.CharField(max_length=255)
    MSISDN = models.CharField(max_length=255)
    IMSI = models.CharField(max_length=255)
    B_PARTY_MSISDN = models.CharField(max_length=255)
    DURATION = models.IntegerField()
    CALLINGNUMBER = models.CharField(max_length=255)
    CALLEDNUMBER = models.CharField(max_length=255)
    IMEI = models.CharField(max_length=255)
    CALLLOCATION = models.CharField(max_length=255)
    SITE_ID = models.CharField(max_length=255)
    SITE = models.CharField(max_length=255)
    GOVERNORATE = models.CharField(max_length=255)
    LONGITUDE = models.FloatField()
    LATITUDE = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.MSISDN

class Archive(models.Model):
    T = models.AutoField(primary_key=True)
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.phone_number

class Dispatch(models.Model):
    T = models.AutoField(primary_key=True)
    name_accused = models.CharField(max_length=255)
    saved_numbers = models.CharField(max_length=255)
    saved_name = models.CharField(max_length=255)
    saved_info = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name_accused

class Media(models.Model):
    PersonID = models.ForeignKey('Person', related_name='media', on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/', null=True, blank=True)  # Updated this line
    file_path = models.CharField(max_length=255)  # Keep this for backward compatibility
    file_type = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.file_path or str(self.file)