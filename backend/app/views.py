from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Person, a_temp, z_temp, k_temp
from .serializers import PersonSerializer, ATempSerializer, ZTempSerializer, KTempSerializer
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
        # Test route to check if API is working
        return Response({"message": "Import Data API is working!"}, status=status.HTTP_200_OK)
