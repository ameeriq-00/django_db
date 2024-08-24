# app/views.py

from rest_framework import generics
from .models import Person, ATemp, ZTemp, KTemp, Archive, Dispatch
from .serializers import PersonSerializer, ATempSerializer, ZTempSerializer, KTempSerializer, ArchiveSerializer, DispatchSerializer

class PersonListCreate(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class PersonRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class ATempListCreate(generics.ListCreateAPIView):
    queryset = ATemp.objects.all()
    serializer_class = ATempSerializer

class ZTempListCreate(generics.ListCreateAPIView):
    queryset = ZTemp.objects.all()
    serializer_class = ZTempSerializer

class KTempListCreate(generics.ListCreateAPIView):
    queryset = KTemp.objects.all()
    serializer_class = KTempSerializer

class ArchiveListCreate(generics.ListCreateAPIView):
    queryset = Archive.objects.all()
    serializer_class = ArchiveSerializer

class DispatchListCreate(generics.ListCreateAPIView):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer

