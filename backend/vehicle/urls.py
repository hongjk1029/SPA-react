from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from vehicle import views

urlpatterns = [
    # get, post vehicle list
    path('vehicle_brand_list/', views.VehicleBrandList.as_view()),
    # get, put, delete vehicle details with ID
    path('vehicle_brand_details/<int:pk>/', views.VehicleBrandDetails.as_view()),
    
    path('vehicle_list/', views.VehicleList.as_view()),

    path('vehicle_document_list/', views.VehicleDocumentList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)