# Generated by Django 4.1.2 on 2022-10-22 09:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vehicle', '0004_remove_vehicle_vehicle_document_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicleimage',
            name='vehicle',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='vehicle.vehicle'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='vehicledocument',
            name='vehicle',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='vehicle.vehicle'),
        ),
    ]