from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse
import pandas as pd
from dateutil import parser
from django.utils import timezone


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
import logging
logger = logging.getLogger(__name__)

def home(request):
    return HttpResponse("Welcome to the Home Page")

# Person Views
class PersonListCreate(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]

class PersonRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]

# Archive Views
class ArchiveListCreate(generics.ListCreateAPIView):
    queryset = Archive.objects.all()
    serializer_class = ArchiveSerializer
    permission_classes = [IsAuthenticated]

class ArchiveRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Archive.objects.all()
    serializer_class = ArchiveSerializer
    permission_classes = [IsAuthenticated]

# Dispatch Views
class DispatchListCreate(generics.ListCreateAPIView):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer
    permission_classes = [IsAuthenticated]

class DispatchRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer
    permission_classes = [IsAuthenticated]

# ATemp Views
class ATempListCreate(generics.ListCreateAPIView):
    serializer_class = ATempSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = ATemp.objects.all()
        person_id = self.request.query_params.get('PersonID')
        if person_id:
            queryset = queryset.filter(PersonID=person_id)
        return queryset

class ATempRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ATemp.objects.all()
    serializer_class = ATempSerializer
    permission_classes = [IsAuthenticated]

# ZTemp Views
class ZTempListCreate(generics.ListCreateAPIView):
    serializer_class = ZTempSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = ZTemp.objects.all()
        person_id = self.request.query_params.get('PersonID')
        if person_id:
            queryset = queryset.filter(PersonID=person_id)
        return queryset

class ZTempRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ZTemp.objects.all()
    serializer_class = ZTempSerializer
    permission_classes = [IsAuthenticated]

# KTemp Views
class KTempListCreate(generics.ListCreateAPIView):
    serializer_class = KTempSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = KTemp.objects.all()
        person_id = self.request.query_params.get('PersonID')
        if person_id:
            queryset = queryset.filter(PersonID=person_id)
        return queryset

class KTempRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = KTemp.objects.all()
    serializer_class = KTempSerializer
    permission_classes = [IsAuthenticated]

# Media Views
class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()  # Add this line
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        queryset = Media.objects.all()
        person_id = self.request.query_params.get('PersonID')
        if person_id:
            queryset = queryset.filter(PersonID=person_id)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

# Import Data View


class ImportData(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def find_ztemp_header_row(self, df):
        ztemp_headers = {'Date', 'CALL_TYPE', 'Duration', 'Calling Number', 'Called Number', 'Call Location', 'Site ID', 'Split'}
        for i in range(min(10, len(df))):  # Check first 10 rows or all rows if less than 10
            if set(df.iloc[i].dropna()) == ztemp_headers:
                return i
        return None

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
                    E_REPORT=str(row['E_REPORT']) if pd.notnull(row['E_REPORT']) else '',
                    CALLER_NUMBER=str(row['CALLER_NUMBER']) if pd.notnull(row['CALLER_NUMBER']) else '',
                    CALLED_NUMBER=str(row['CALLED_NUMBER']) if pd.notnull(row['CALLED_NUMBER']) else '',
                    THIRD_PARTY_NUMBER=str(row['THIRD_PARTY_NUMBER']) if pd.notnull(row['THIRD_PARTY_NUMBER']) else '',
                    CALL_INITIAL_TIME=parser.parse(str(row['CALL_INITIAL_TIME']), dayfirst=True) if pd.notnull(row['CALL_INITIAL_TIME']) else timezone.now(),
                    CONVERSATION_DURATION=int(row['CONVERSATION_DURATION']) if pd.notnull(row['CONVERSATION_DURATION']) else 0,
                    CITY=str(row['CITY']) if pd.notnull(row['CITY']) else '',
                    SITE_NAME=str(row['SITE_NAME']) if pd.notnull(row['SITE_NAME']) else '',
                    CHARGED_MOBILE_USER_IMEI=str(row['CHARGED_MOBILE_USER_IMEI']) if pd.notnull(row['CHARGED_MOBILE_USER_IMEI']) else '',
                    CHARGED_MOBILE_USER_IMSI=str(row['CHARGED_MOBILE_USER_IMSI']) if pd.notnull(row['CHARGED_MOBILE_USER_IMSI']) else '',
                    LON=float(row['LON']) if pd.notnull(row['LON']) else 0.0,
                    LAT=float(row['LAT']) if pd.notnull(row['LAT']) else 0.0,
                    SITE_ID=str(row['SITE_ID']) if pd.notnull(row['SITE_ID']) else '',
                    CGI=str(row['CGI']) if pd.notnull(row['CGI']) else '',
                    COMMENTS=str(row['COMMENTS']) if pd.notnull(row['COMMENTS']) else ''
                )
        else:
            ztemp_header_row = self.find_ztemp_header_row(df)
            if ztemp_header_row is not None:
                df = df.iloc[ztemp_header_row:].reset_index(drop=True)
                df.columns = df.iloc[0]
                df = df[1:]  # Remove the header row from the data
                for _, row in df.iterrows():
                    ZTemp.objects.create(
                        PersonID=person,
                        Date=parser.parse(str(row['Date']), dayfirst=True) if pd.notnull(row['Date']) else timezone.now(),
                        CALL_TYPE=str(row['CALL_TYPE']) if pd.notnull(row['CALL_TYPE']) else '',
                        Duration=int(row['Duration']) if pd.notnull(row['Duration']) else 0,
                        Calling_Number=str(row['Calling Number']) if pd.notnull(row['Calling Number']) else '',
                        Called_Number=str(row['Called Number']) if pd.notnull(row['Called Number']) else '',
                        Call_Location=str(row['Call Location']) if pd.notnull(row['Call Location']) else '',
                        Site_ID=str(row['Site ID']) if pd.notnull(row['Site ID']) else '',
                        Split=str(row['Split']) if pd.notnull(row['Split']) else ''
                    )
            elif set(df.columns) == {'DATETIME', 'CALL_TYPE', 'MSISDN', 'IMSI', 'B_PARTY_MSISDN', 'DURATION', 'CALLINGNUMBER', 'CALLEDNUMBER', 'IMEI', 'CALLLOCATION', 'SITE_ID', 'SITE', 'GOVERNORATE', 'LONGITUDE', 'LATITUDE'}:
                for _, row in df.iterrows():
                    KTemp.objects.create(
                        PersonID=person,
                        DATETIME=parser.parse(str(row['DATETIME']), dayfirst=True) if pd.notnull(row['DATETIME']) else timezone.now(),
                        CALL_TYPE=str(row['CALL_TYPE']) if pd.notnull(row['CALL_TYPE']) else '',
                        MSISDN=str(row['MSISDN']) if pd.notnull(row['MSISDN']) else '',
                        IMSI=str(row['IMSI']) if pd.notnull(row['IMSI']) else '',
                        B_PARTY_MSISDN=str(row['B_PARTY_MSISDN']) if pd.notnull(row['B_PARTY_MSISDN']) else '',
                        DURATION=int(row['DURATION']) if pd.notnull(row['DURATION']) else 0,
                        CALLINGNUMBER=str(row['CALLINGNUMBER']) if pd.notnull(row['CALLINGNUMBER']) else '',
                        CALLEDNUMBER=str(row['CALLEDNUMBER']) if pd.notnull(row['CALLEDNUMBER']) else '',
                        IMEI=str(row['IMEI']) if pd.notnull(row['IMEI']) else '',
                        CALLLOCATION=str(row['CALLLOCATION']) if pd.notnull(row['CALLLOCATION']) else '',
                        SITE_ID=str(row['SITE_ID']) if pd.notnull(row['SITE_ID']) else '',
                        SITE=str(row['SITE']) if pd.notnull(row['SITE']) else '',
                        GOVERNORATE=str(row['GOVERNORATE']) if pd.notnull(row['GOVERNORATE']) else '',
                        LONGITUDE=float(row['LONGITUDE']) if pd.notnull(row['LONGITUDE']) else 0.0,
                        LATITUDE=float(row['LATITUDE']) if pd.notnull(row['LATITUDE']) else 0.0
                    )
            else:
                return Response({"error": "Unrecognized template"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Data imported successfully"}, status=status.HTTP_200_OK)