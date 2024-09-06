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
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Media
        fields = ['id', 'PersonID', 'file', 'file_path', 'file_type', 'file_url', 'created_at', 'updated_at']

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and hasattr(obj.file, 'url'):
            return request.build_absolute_uri(obj.file.url)
        elif obj.file_path:
            return request.build_absolute_uri(obj.file_path)
        return None