from django.urls import path
from app import views
from .views import (
    PersonListCreate,
    PersonRetrieveUpdateDestroy,
    ATempListCreate,
    ZTempListCreate,
    KTempListCreate,
    ArchiveListCreate,
    ArchiveRetrieveUpdateDestroy,
    DispatchListCreate,
    DispatchRetrieveUpdateDestroy,
    MediaListCreate,
    ImportData,
    home
)

urlpatterns = [
    path('persons/', PersonListCreate.as_view(), name='person-list-create'),
    path('persons/<int:pk>/', PersonRetrieveUpdateDestroy.as_view(), name='person-detail'),
    path('import/<int:person_id>/', ImportData.as_view(), name='import-data'),
    path('a_temp/', ATempListCreate.as_view(), name='a_temp-list-create'),
    path('z_temp/', ZTempListCreate.as_view(), name='z_temp-list-create'),
    path('k_temp/', KTempListCreate.as_view(), name='k_temp-list-create'),
    path('archives/', ArchiveListCreate.as_view(), name='archive-list-create'),
    path('archives/<int:pk>/', ArchiveRetrieveUpdateDestroy.as_view(), name='archive-detail'),
    path('dispatches/', DispatchListCreate.as_view(), name='dispatch-list-create'),
    path('dispatches/<int:pk>/', DispatchRetrieveUpdateDestroy.as_view(), name='dispatch-detail'),
    path('media/', MediaListCreate.as_view(), name='media-list-create'),
    path('', home, name='home'),  # Home view
]
