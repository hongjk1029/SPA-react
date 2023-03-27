# Generated by Django 4.1.2 on 2023-03-27 07:04

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle', models.CharField(max_length=255)),
                ('vehicle_overview', models.CharField(max_length=255)),
                ('number_plate', models.CharField(max_length=10)),
                ('is_active', models.BooleanField(default=True)),
                ('price_of_cost', models.DecimalField(decimal_places=2, default=0, max_digits=65)),
                ('price_of_sale', models.DecimalField(decimal_places=2, default=0, max_digits=65)),
                ('fuel_type', models.CharField(max_length=50)),
                ('model_year', models.IntegerField(default=None)),
                ('seating_capacity', models.IntegerField(default=None)),
                ('mileage', models.IntegerField(default=None)),
                ('accessories', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=20), max_length=255, size=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('removed', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleBrand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand_name', models.CharField(max_length=255)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('removed', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleRent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rent_active', models.BooleanField(default=False)),
                ('price_per_week', models.DecimalField(decimal_places=2, default=0, max_digits=65)),
                ('price_per_month', models.DecimalField(decimal_places=2, default=0, max_digits=65)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle_image', models.ImageField(upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('removed', models.DateTimeField(blank=True, null=True)),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vehicle_image', to='vehicle.vehicle')),
            ],
        ),
        migrations.CreateModel(
            name='VehicleDocument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document', models.FileField(null=True, upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('removed', models.DateTimeField(blank=True, null=True)),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='vehicle.vehicle')),
            ],
        ),
        migrations.AddField(
            model_name='vehicle',
            name='vehicle_brand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehicle.vehiclebrand'),
        ),
    ]
