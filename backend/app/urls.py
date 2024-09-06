from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app import views
from .auth_views import CustomTokenObtainPairView, CustomTokenRefreshView, protected_view

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'media', views.MediaViewSet)

urlpatterns = [
    path('', views.home, name='home'),
    path('persons/', views.PersonListCreate.as_view(), name='person-list-create'),
    path('persons/<int:pk>/', views.PersonRetrieveUpdateDestroy.as_view(), name='person-detail'),
    path('import/<int:person_id>/', views.ImportData.as_view(), name='import-data'),
    path('a_temp/', views.ATempListCreate.as_view(), name='a_temp-list-create'),
    path('a_temp/<int:pk>/', views.ATempRetrieveUpdateDestroy.as_view(), name='a_temp-detail'),
    path('z_temp/', views.ZTempListCreate.as_view(), name='z_temp-list-create'),
    path('z_temp/<int:pk>/', views.ZTempRetrieveUpdateDestroy.as_view(), name='z_temp-detail'),
    path('k_temp/', views.KTempListCreate.as_view(), name='k_temp-list-create'),
    path('k_temp/<int:pk>/', views.KTempRetrieveUpdateDestroy.as_view(), name='k_temp-detail'),
    path('archives/', views.ArchiveListCreate.as_view(), name='archive-list-create'),
    path('archives/<int:pk>/', views.ArchiveRetrieveUpdateDestroy.as_view(), name='archive-detail'),
    path('dispatches/', views.DispatchListCreate.as_view(), name='dispatch-list-create'),
    path('dispatches/<int:pk>/', views.DispatchRetrieveUpdateDestroy.as_view(), name='dispatch-detail'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', protected_view, name='protected'),
    
    # Include the router URLs
    path('', include(router.urls)),
]