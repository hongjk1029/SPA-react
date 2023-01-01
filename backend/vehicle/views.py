from vehicle.models import Vehicle, VehicleBrand, VehicleDocument
from rest_framework import generics
from vehicle.serializers import VehicleBrandSerializer, VehicleDocumentSerializer, VehicleSerializer

# Vehicle Brand Here
class BrandList(generics.ListCreateAPIView):
    """
    Create New Brand
    View All Brand in a List
    """
    queryset = VehicleBrand.objects.all()
    serializer_class = VehicleBrandSerializer

class BrandDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    View Brand Details
    Update Brand Details
    Delete Brand
    """
    queryset = VehicleBrand.objects.all()
    serializer_class = VehicleBrandSerializer

# Vehicle Here
class VehicleList(generics.ListCreateAPIView):
    """
    Create New Car
    View All Car in a List
    """
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class VehicleDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    View Car Details
    Update Car Details
    Delete Car
    """
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


# vehicle document here
class VehicleDocumentList(generics.ListCreateAPIView):
    queryset = VehicleDocument.objects.all()
    serializer_class = VehicleDocumentSerializer