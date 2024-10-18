from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import MenuItem, CateringOrder
from .serializers import MenuItemSerializer, CateringOrderSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

class CateringOrderViewSet(viewsets.ModelViewSet):
    queryset = CateringOrder.objects.all()
    serializer_class = CateringOrderSerializer
