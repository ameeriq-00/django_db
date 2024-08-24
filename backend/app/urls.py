# app/urls.py

from django.urls import path
from .views import PersonListCreate, PersonRetrieveUpdateDestroy, ArchiveListCreate, ArchiveRetrieveUpdateDestroy, ImportData, home

urlpatterns = [
    path('persons/', PersonListCreate.as_view(), name='person-list-create'),
    path('persons/<int:pk>/', PersonRetrieveUpdateDestroy.as_view(), name='person-detail'),
    path('archive/', ArchiveListCreate.as_view(), name='archive-list-create'),
    path('archive/<int:pk>/', ArchiveRetrieveUpdateDestroy.as_view(), name='archive-detail'),
    path('import/<int:person_id>/', ImportData.as_view(), name='import-data'),
    path('', home, name='home'),
]
