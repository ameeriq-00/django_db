from django.urls import path
from app.views import PersonListCreate, PersonRetrieveUpdateDestroy, ImportData, home

urlpatterns = [
    path('persons/', PersonListCreate.as_view(), name='person-list-create'),
    path('persons/<int:pk>/', PersonRetrieveUpdateDestroy.as_view(), name='person-detail'),
    path('import/<int:person_id>/', ImportData.as_view(), name='import-data'),
    path('', home, name='home'),  # Home view
]
