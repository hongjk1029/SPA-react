from pyexpat import model
from pkg_resources import require
from rest_framework import serializers
import vehicle
from vehicle.models import *
    
class VehicleBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleBrand
        fields = '__all__'

class VehicleDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleDocument
        fields = ['id', 'document']

class VehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    vehicle_documents = serializers.ListField(write_only=True, required=False)

    class Meta:
        model = Vehicle
        fields = ['id', 'vehicle', 'vehicle_brand', 'vehicle_overview', 'number_plate', 'price_of_cost', 'price_of_sale', 'vehicle_details', 'vehicle_documents',]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['vehicle_brand'] = VehicleBrandSerializer(instance.vehicle_brand).data
        representation['vehicle_documents'] = VehicleDocumentSerializer(instance.documents.all(), many=True).data
        return representation

    def create(self, validated_data):
        car_doc = validated_data.pop('vehicle_documents', [])
        create_vehicle = super().create(validated_data)
    
        if car_doc:
            create_vehicle_doc = create_vehicle.documents.bulk_create([VehicleDocument(document=doc, vehicle=create_vehicle) for doc in car_doc])

        return create_vehicle
