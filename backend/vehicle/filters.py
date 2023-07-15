from django_filters import filters
from django_filters.rest_framework import filterset
from vehicle.models import Vehicle

class VehicleFilter(filterset.FilterSet):
    vehicle_type = filters.CharFilter(method="filter_vehicle_type", required=False)

    class Meta:
        model = Vehicle
        fields = ["vehicle_type"]

    def filter_vehicle_type(self, queryset, name, value):
        standardize_get_value = value.lower()
        if standardize_get_value == 'sale':
            filter_list = queryset.filter(price_per_day__isnull=True, price_per_month__isnull=True)
        if standardize_get_value == 'rental':
            filter_list = queryset.filter(price_of_cost__isnull=True, price_of_sale__isnull=True)
        return filter_list