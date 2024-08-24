from rest_framework import serializers
from .models import Person, a_temp, z_temp, k_temp
from .models import Archive

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class ATempSerializer(serializers.ModelSerializer):
    class Meta:
        model = a_temp
        fields = '__all__'

class ZTempSerializer(serializers.ModelSerializer):
    class Meta:
        model = z_temp
        fields = '__all__'

class KTempSerializer(serializers.ModelSerializer):
    class Meta:
        model = k_temp
        fields = '__all__'
# app/serializers.py

class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = '__all__'

