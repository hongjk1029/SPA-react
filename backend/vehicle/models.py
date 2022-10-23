from django.db import models

# Create your models here.
class VehicleBrand(models.Model):
    brand_name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.brand_name

sales_type = [
    ('Sales','Sales'),
    ('Rent','Rent'),
]

fuel_type = [
    ('Petrol','Petrol'),
    ('Hybrid','Hybrid'),
    ('EV','EV'),
]

class VehicleDetails(models.Model):
    fuel_type = models.CharField(max_length=255)
    model_year = models.IntegerField()
    vehicle_milleage = models.IntegerField()
    seating_capacity = models.IntegerField()
    air_conditioner = models.BooleanField()
    power_door_locks = models.BooleanField()
    anti_lock_brake = models.BooleanField()
    brake_assist = models.BooleanField()
    power_steering = models.BooleanField()
    driver_airbag = models.BooleanField()
    passenger_airbag = models.BooleanField()
    power_window = models.BooleanField()
    cd_player = models.BooleanField()
    central_locking = models.BooleanField()
    crash_sensor = models.BooleanField()
    leather_seat = models.BooleanField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class VehicleRent(models.Model):
    rent_active = models.BooleanField(default=False)
    price_per_week = models.DecimalField(default=0, max_digits=999,decimal_places=2)
    price_per_month = models.DecimalField(default=0, max_digits=999,decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class Vehicle(models.Model):
    vehicle = models.CharField(max_length=255)
    vehicle_brand = models.ForeignKey(VehicleBrand, on_delete=models.CASCADE)
    vehicle_overview = models.CharField(max_length=255)  
    number_plate = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    # vehicle_rent_active = models.OneToOneField(VehicleRent,on_delete=models.CASCADE)
    # price_of_cost = models.DecimalField(max_digits=999,decimal_places=2)
    # price_of_sale = models.DecimalField(max_digits=999,decimal_places=2)
    # vehicle_details = models.OneToOneField(VehicleDetails, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.vehicle

class VehicleDocument(models.Model):
    document = models.FileField(null=True)
    vehicle = models.ForeignKey(Vehicle, related_name='documents', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class VehicleImage(models.Model):   
    vehical_image = models.ImageField()
    vehicle = models.ForeignKey(Vehicle, related_name='vehicle_image', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)