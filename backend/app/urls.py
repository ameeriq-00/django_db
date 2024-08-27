from django.urls import path
from app import views

urlpatterns = [
    path('persons/', views.PersonListCreate.as_view(), name='person-list-create'),
    path('persons/<int:pk>/', views.PersonRetrieveUpdateDestroy.as_view(), name='person-detail'),
    path('import/<int:person_id>/', views.ImportData.as_view(), name='import-data'),
    path('a_temp/', views.ATempListCreate.as_view(), name='a_temp-list-create'),
    path('a_temp/<int:pk>/', views.ATempRetrieveUpdateDestroy.as_view(), name='a_temp-detail'),  # Add this line
    path('z_temp/', views.ZTempListCreate.as_view(), name='z_temp-list-create'),
    path('z_temp/<int:pk>/', views.ZTempRetrieveUpdateDestroy.as_view(), name='z_temp-detail'),  # Add this line
    path('k_temp/', views.KTempListCreate.as_view(), name='k_temp-list-create'),
    path('k_temp/<int:pk>/', views.KTempRetrieveUpdateDestroy.as_view(), name='k_temp-detail'),  # Add this line
    path('archives/', views.ArchiveListCreate.as_view(), name='archive-list-create'),
    path('archives/<int:pk>/', views.ArchiveRetrieveUpdateDestroy.as_view(), name='archive-detail'),
    path('dispatches/', views.DispatchListCreate.as_view(), name='dispatch-list-create'),
    path('dispatches/<int:pk>/', views.DispatchRetrieveUpdateDestroy.as_view(), name='dispatch-detail'),
    path('media/', views.MediaListCreate.as_view(), name='media-list-create'),
    path('', views.home, name='home'),
]
