from django.shortcuts import render
from vehicle.models import Vehicle, VehicleBrand, VehicleDocument
from rest_framework import generics
from rest_framework.views import APIView
from vehicle.serializers import VehicleBrandSerializer, VehicleDocumentSerializer, VehicleSerializer
from rest_framework.response import Response

# Vehicle Brand Here
class VehicleBrandList(generics.ListCreateAPIView):
    """
    create and view list for vehicle
    """
    queryset = VehicleBrand.objects.all()
    serializer_class = VehicleBrandSerializer

class VehicleBrandDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    
    """
    queryset = VehicleBrand.objects.all()
    serializer_class = VehicleBrandSerializer

# Vehicle Here
class VehicleList(APIView):
    # queryset = Vehicle.objects.all()
    # serializer_class = VehicleSerializer

    def get(self, request, format=None):
        vehicle = Vehicle.objects.all()
        serializer = VehicleSerializer(vehicle, many=True)
        return Response(serializer.data)

class VehicleDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


###### vehicle document here
class VehicleDocumentList(generics.ListCreateAPIView):
    queryset = VehicleDocument.objects.all()
    serializer_class = VehicleDocumentSerializer