from django.contrib import admin
from vehicle.models import *

# Register your models here.
admin.site.register(Vehicle)
admin.site.register(VehicleBrand)
admin.site.register(VehicleDocument)
admin.site.register(VehicleImage)