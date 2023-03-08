from vehicle.models import Vehicle, VehicleBrand, VehicleDocument
from rest_framework import generics
from vehicle.serializers import VehicleBrandSerializer, VehicleDocumentSerializer, VehicleSerializer
from django.utils import timezone 

# Vehicle Brand Here
class BrandList(generics.ListCreateAPIView):
    """
    Create New Brand
    View All Brand in a List
    """
    queryset = VehicleBrand.objects.exclude(removed__isnull=False)
    serializer_class = VehicleBrandSerializer

class BrandDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    View Brand Details
    Update Brand Details
    Delete Brand
    """
    queryset = VehicleBrand.objects.all()
    serializer_class = VehicleBrandSerializer

    def perform_destroy(self, instance):
        instance.removed = timezone.now()
        return instance.save()

# Vehicle Here
class VehicleList(generics.ListCreateAPIView):
    """
    Create New Car
    View All Car in a List
    """
    queryset = Vehicle.objects.exclude(removed__isnull=False)
    serializer_class = VehicleSerializer

class VehicleDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    View Car Details
    Update Car Details
    Delete Car
    """
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

    def perform_destroy(self, instance):
        queryset_doc = instance.documents.filter(vehicle_id=instance)
        queryset_images = instance.vehicle_image.filter(vehicle_id=instance)
        queryset_doc.update(removed=timezone.now())
        queryset_images.update(removed=timezone.now())
        instance.removed = timezone.now()
        return instance.save()
