# app/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('persons/', views.PersonListCreate.as_view(), name='person-list-create'),
    path('persons/<int:pk>/', views.PersonRetrieveUpdateDestroy.as_view(), name='person-detail'),
    path('import/', views.ImportData.as_view(), name='import-data'),
    # Add more paths as needed
]
