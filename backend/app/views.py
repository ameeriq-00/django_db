from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Person, ATemp, ZTemp, KTemp, Archive, Dispatch, Media
from .serializers import (
    PersonSerializer,
    ATempSerializer,
    ZTempSerializer,
    KTempSerializer,
    ArchiveSerializer,
    DispatchSerializer,
    MediaSerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Home Page")

# Person List/Create View
class PersonListCreate(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

# Person Detail/Update/Delete View
class PersonRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

# Archive List/Create View
class ArchiveListCreate(generics.ListCreateAPIView):
    queryset = Archive.objects.all()
    serializer_class = ArchiveSerializer

# Archive Detail/Update/Delete View
class ArchiveRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Archive.objects.all()
    serializer_class = ArchiveSerializer

# Dispatch List/Create View
class DispatchListCreate(generics.ListCreateAPIView):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer

# Dispatch Detail/Update/Delete View
class DispatchRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer

# a_temp List/Create View
class ATempListCreate(generics.ListCreateAPIView):
    queryset = ATemp.objects.all()
    serializer_class = ATempSerializer

# z_temp List/Create View
class ZTempListCreate(generics.ListCreateAPIView):
    queryset = ZTemp.objects.all()
    serializer_class = ZTempSerializer

# k_temp List/Create View
class KTempListCreate(generics.ListCreateAPIView):
    queryset = KTemp.objects.all()
    serializer_class = KTempSerializer

# Media List/Create View
class MediaListCreate(generics.ListCreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer

# Import Data View
class ImportData(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, person_id):
        person = Person.objects.get(pk=person_id)
        excel_file = request.FILES.get('file')

        # Logic to process the Excel file and save data to appropriate model
        # based on the template (a_temp, z_temp, or k_temp)

        return Response(status=status.HTTP_200_OK)

    def get(self, request):
        return Response({"message": "Import Data API is working!"}, status=status.HTTP_200_OK)
