# serializers.py
# serializers.py

from rest_framework import serializers
from .models import Table, Reservation
from django.utils import timezone

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

    def validate(self, attrs):
        # Check if the table is already reserved for the specified date and time
        table = attrs.get('table')
        date = attrs.get('date')
        time = attrs.get('time')

        if Reservation.objects.filter(table=table, date=date, time=time).exists():
            raise serializers.ValidationError("This table is already reserved for the selected date and time.")
        
        return attrs
