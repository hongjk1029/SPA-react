from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class VehicleBrand(models.Model):
    brand_name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    removed = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.brand_name

sales_type = [
    ('Sales','Sales'),
    ('Rent','Rent'),
]

# fuel_type = [
    # ('Petrol','Petrol'),
    # ('Hybrid','Hybrid'),
    # ('EV','EV'),
# ]
class VehicleRent(models.Model):
    rent_active = models.BooleanField(default=False)
    price_per_week = models.DecimalField(default=0, max_digits=65,decimal_places=2)
    price_per_month = models.DecimalField(default=0, max_digits=65,decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class Vehicle(models.Model):
    vehicle = models.CharField(max_length=255)
    vehicle_brand = models.ForeignKey(VehicleBrand, on_delete=models.CASCADE)
    vehicle_overview = models.CharField(max_length=255)  
    number_plate = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    # vehicle_rent_active = models.OneToOneField(VehicleRent,on_delete=models.CASCADE)
    price_of_cost = models.DecimalField(default=0, max_digits=65,decimal_places=2)
    price_of_sale = models.DecimalField(default=0, max_digits=65,decimal_places=2)
    # vehicle_details = ArrayField(models.CharField(max_length=200), blank=True)
    fuel_type = models.CharField(max_length=50)
    model_year = models.IntegerField(default=None)
    seating_capacity = models.IntegerField(default=None)
    mileage = models.IntegerField(default=None)
    accessories = ArrayField(models.CharField(max_length=20), size=10, max_length=255)
    # accessories = ListCharField(base_field=models.CharField(max_length=20), size=10, max_length=255)
    # vehicle_details = ListCharField(
    #     base_field=models.CharField(max_length=10),
    #     size=6,
    #     max_length=100,  # 6 * 10 character nominals, plus commas
    # )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    removed = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.vehicle

class VehicleDocument(models.Model):
    document = models.FileField(null=True)
    vehicle = models.ForeignKey(Vehicle, related_name='documents', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    removed = models.DateTimeField(null=True, blank=True)

class VehicleImage(models.Model):   
    vehicle_image = models.ImageField()
    vehicle = models.ForeignKey(Vehicle, related_name='vehicle_image', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    removed = models.DateTimeField(null=True, blank=True)