from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Token views
class CustomTokenObtainPairView(TokenObtainPairView):
    pass  # You can customize the response if needed

class CustomTokenRefreshView(TokenRefreshView):
    pass  # You can customize the response if needed

# Example of a protected view
@api_view(['GET'])
def protected_view(request):
    return Response({'message': 'This is a protected view, only accessible with a valid token.'})
