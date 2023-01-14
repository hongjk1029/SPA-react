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
        fields = '__all__'

class VehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    vehicle_brand = VehicleBrandSerializer(read_only=True)
    # documents = VehicleDocumentSerializer(many=True)
    vehicle_image = VehicleImageSerializer(many=True)

    class Meta:
        model = Vehicle
        fields = '__all__'

    # def create(self, validated_data):
    #     car_image_data = validated_data.pop('profile')
    #     user = Vehicle.objects.create(**validated_data)
    #     VehicleImage.objects.create(user=user, **car_image_data)
    #     return user
