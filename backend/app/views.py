from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
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
import pandas as pd
from dateutil import parser

def home(request):
    return HttpResponse("Welcome to the Home Page")

# Person List/Create View
class PersonListCreate(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]

# Person Detail/Update/Delete View
class PersonRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]

# Archive List/Create View
class ArchiveListCreate(generics.ListCreateAPIView):
    queryset = Archive.objects.all()
    serializer_class = ArchiveSerializer
    permission_classes = [IsAuthenticated]

# Archive Detail/Update/Delete View
class ArchiveRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Archive.objects.all()
    serializer_class = ArchiveSerializer
    permission_classes = [IsAuthenticated]

# Dispatch List/Create View
class DispatchListCreate(generics.ListCreateAPIView):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer
    permission_classes = [IsAuthenticated]

# Dispatch Detail/Update/Delete View
class DispatchRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer
    permission_classes = [IsAuthenticated]

# ATemp List/Create View
class ATempListCreate(generics.ListCreateAPIView):
    queryset = ATemp.objects.all()
    serializer_class = ATempSerializer
    permission_classes = [IsAuthenticated]

class ATempRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ATemp.objects.all()
    serializer_class = ATempSerializer
    permission_classes = [IsAuthenticated]

# ZTemp List/Create View
class ZTempListCreate(generics.ListCreateAPIView):
    queryset = ZTemp.objects.all()
    serializer_class = ZTempSerializer
    permission_classes = [IsAuthenticated]

class ZTempRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ZTemp.objects.all()
    serializer_class = ZTempSerializer
    permission_classes = [IsAuthenticated]

# KTemp List/Create View
class KTempListCreate(generics.ListCreateAPIView):
    queryset = KTemp.objects.all()
    serializer_class = KTempSerializer
    permission_classes = [IsAuthenticated]

class KTempRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = KTemp.objects.all()
    serializer_class = KTempSerializer
    permission_classes = [IsAuthenticated]

# Media List/Create View
class MediaListCreate(generics.ListCreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]

# Import Data View
class ImportData(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, person_id):
        person = Person.objects.get(pk=person_id)
        excel_file = request.FILES.get('file')

        if not excel_file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        df = pd.read_excel(excel_file)

        if set(df.columns) == {'E_REPORT', 'CALLER_NUMBER', 'CALLED_NUMBER', 'THIRD_PARTY_NUMBER', 'CALL_INITIAL_TIME', 'CONVERSATION_DURATION', 'CITY', 'SITE_NAME', 'CHARGED_MOBILE_USER_IMEI', 'CHARGED_MOBILE_USER_IMSI', 'LON', 'LAT', 'SITE_ID', 'CGI', 'COMMENTS'}:
            for _, row in df.iterrows():
                ATemp.objects.create(
                    PersonID=person,
                    E_REPORT=row['E_REPORT'],
                    CALLER_NUMBER=row['CALLER_NUMBER'],
                    CALLED_NUMBER=row['CALLED_NUMBER'],
                    THIRD_PARTY_NUMBER=row['THIRD_PARTY_NUMBER'],
                    CALL_INITIAL_TIME=parser.parse(row['CALL_INITIAL_TIME'], dayfirst=True),
                    CONVERSATION_DURATION=row['CONVERSATION_DURATION'],
                    CITY=row['CITY'],
                    SITE_NAME=row['SITE_NAME'],
                    CHARGED_MOBILE_USER_IMEI=row['CHARGED_MOBILE_USER_IMEI'],
                    CHARGED_MOBILE_USER_IMSI=row['CHARGED_MOBILE_USER_IMSI'],
                    LON=row['LON'],
                    LAT=row['LAT'],
                    SITE_ID=row['SITE_ID'],
                    CGI=row['CGI'],
                    COMMENTS=row['COMMENTS']
                )
        elif set(df.columns) == {'Date', 'CALL_TYPE', 'Duration', 'Calling Number', 'Called Number', 'Call Location', 'Site ID', 'Split'}:
            for _, row in df.iterrows():
                ZTemp.objects.create(
                    PersonID=person,
                    Date=parser.parse(row['Date'], dayfirst=True),
                    CALL_TYPE=row['CALL_TYPE'],
                    Duration=row['Duration'],
                    Calling_Number=row['Calling Number'],
                    Called_Number=row['Called Number'],
                    Call_Location=row['Call Location'],
                    Site_ID=row['Site ID'],
                    Split=row['Split']
                )
        elif set(df.columns) == {'DATETIME', 'CALL_TYPE', 'MSISDN', 'IMSI', 'B_PARTY_MSISDN', 'DURATION', 'CALLINGNUMBER', 'CALLEDNUMBER', 'IMEI', 'CALLLOCATION', 'SITE_ID', 'SITE', 'GOVERNORATE', 'LONGITUDE', 'LATITUDE'}:
            for _, row in df.iterrows():
                KTemp.objects.create(
                    PersonID=person,
                    DATETIME=parser.parse(row['DATETIME'], dayfirst=True),
                    CALL_TYPE=row['CALL_TYPE'],
                    MSISDN=row['MSISDN'],
                    IMSI=row['IMSI'],
                    B_PARTY_MSISDN=row['B_PARTY_MSISDN'],
                    DURATION=row['DURATION'],
                    CALLINGNUMBER=row['CALLINGNUMBER'],
                    CALLEDNUMBER=row['CALLEDNUMBER'],
                    IMEI=row['IMEI'],
                    CALLLOCATION=row['CALLLOCATION'],
                    SITE_ID=row['SITE_ID'],
                    SITE=row['SITE'],
                    GOVERNORATE=row['GOVERNORATE'],
                    LONGITUDE=row['LONGITUDE'],
                    LATITUDE=row['LATITUDE']
                )
        else:
            return Response({"error": "Unrecognized template"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Data imported successfully"}, status=status.HTTP_200_OK)
