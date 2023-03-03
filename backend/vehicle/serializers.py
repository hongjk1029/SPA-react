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
        fields = ['id', 'document', 'vehicle_id']

class VehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = ['id', 'vehicle_image', 'vehicle_id']

class VehicleSerializer(serializers.ModelSerializer):
    accessories = serializers.ListField(write_only=True)
    vehicle_documents = serializers.ListField(write_only=True, required=False)
    vehicle_images = serializers.ListField(write_only=True)

    class Meta:
        model = Vehicle
        fields = ['id', 'vehicle', 'vehicle_brand', 'vehicle_overview', 'number_plate', 'price_of_cost', 'price_of_sale', 'fuel_type', 'model_year', 'seating_capacity', 'mileage', 'accessories', 'vehicle_documents', 'vehicle_images']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['vehicle_brand'] = VehicleBrandSerializer(instance.vehicle_brand).data
        representation['accessories'] = instance.accessories
        representation['vehicle_documents'] = VehicleDocumentSerializer(instance.documents.all(), many=True).data
        representation['vehicle_images'] = VehicleImageSerializer(instance.vehicle_image.all(), many=True).data
        return representation

    def create(self, validated_data):
        car_doc = validated_data.pop('vehicle_documents', [])
        car_images = validated_data.pop('vehicle_images', [])
        create_vehicle = super().create(validated_data)
    
        if car_doc:
            create_vehicle_doc = create_vehicle.documents.bulk_create([VehicleDocument(document=doc, vehicle=create_vehicle) for doc in car_doc])
        if car_images:
            create_vehicle_image = create_vehicle.vehicle_image.bulk_create(VehicleImage(vehicle_image=image, vehicle=create_vehicle) for image in car_images)

        return create_vehicle
