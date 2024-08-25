from rest_framework import serializers
from .models import Person, ATemp, ZTemp, KTemp, Archive, Dispatch, Media

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class ATempSerializer(serializers.ModelSerializer):
    class Meta:
        model = ATemp
        fields = '__all__'

class ZTempSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZTemp
        fields = '__all__'

class KTempSerializer(serializers.ModelSerializer):
    class Meta:
        model = KTemp
        fields = '__all__'

class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = '__all__'

class DispatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispatch
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'
