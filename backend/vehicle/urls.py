from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from vehicle import views

urlpatterns = [
    # Add and View Brand list
    path('brand/', views.BrandList.as_view()),
    # View, Update and Delete Brand details with ID
    path('brand/<pk>/', views.BrandDetails.as_view()),
    # Add and View Car list
    path('vehicle/', views.VehicleList.as_view()),
    # View, Update, Delete Car Details
    path('vehicle/<pk>/', views.VehicleDetails.as_view()),
    # View Document
    path('vehicle_document_list/', views.VehicleDocumentList.as_view()),
    # Update Document
    path('update_vehicle_document/<pk>/', views.UpdateVehicleDocument.as_view()),
    # # Delete Document
    # path('delete_vehicle_document/<pk>/', views.DeleteVehicleDocument.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)