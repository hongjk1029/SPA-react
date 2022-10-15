from django.shortcuts import render
from rest_framework import viewsets
from user.models import Menu
from user.serializers import MenuSerializer
    
class MenuViewSet(viewsets.ModelViewSet):
    serializer_class = MenuSerializer
        
    def get_queryset(self):
        return Menu.objects.all()