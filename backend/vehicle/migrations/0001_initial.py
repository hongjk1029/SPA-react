# Generated by Django 4.1.2 on 2022-10-21 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='VehicleBrand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand_name', models.CharField(max_length=255)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fuel_type', models.CharField(max_length=255)),
                ('model_year', models.IntegerField()),
                ('vehicle_milleage', models.IntegerField()),
                ('seating_capacity', models.IntegerField()),
                ('air_conditioner', models.BooleanField()),
                ('power_door_locks', models.BooleanField()),
                ('anti_lock_brake', models.BooleanField()),
                ('brake_assist', models.BooleanField()),
                ('power_steering', models.BooleanField()),
                ('driver_airbag', models.BooleanField()),
                ('passenger_airbag', models.BooleanField()),
                ('power_window', models.BooleanField()),
                ('cd_player', models.BooleanField()),
                ('central_locking', models.BooleanField()),
                ('crash_sensor', models.BooleanField()),
                ('leather_seat', models.BooleanField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleDocument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document', models.FileField(upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehical_image', models.ImageField(upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleRent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rent_active', models.BooleanField(default=False)),
                ('price_per_week', models.DecimalField(decimal_places=2, default=0, max_digits=999)),
                ('price_per_month', models.DecimalField(decimal_places=2, default=0, max_digits=999)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehical_name', models.CharField(max_length=255)),
                ('vehical_overview', models.CharField(max_length=255)),
                ('number_plate', models.CharField(max_length=10)),
                ('is_active', models.BooleanField()),
                ('price_of_cost', models.DecimalField(decimal_places=2, max_digits=999)),
                ('price_of_sale', models.DecimalField(decimal_places=2, max_digits=999)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('vehical_brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehicle.vehiclebrand')),
                ('vehical_image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehicle.vehicleimage')),
                ('vehicle_details', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='vehicle.vehicledetails')),
                ('vehicle_document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehicle.vehicledocument')),
                ('vehicle_rent_active', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='vehicle.vehiclerent')),
            ],
        ),
    ]