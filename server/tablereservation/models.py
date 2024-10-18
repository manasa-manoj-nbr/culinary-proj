
from django.db import models

class Table(models.Model):
    location = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()
    status = models.CharField(max_length=20, default='available')

    def __str__(self):
        return f'Table {self.id} - {self.location}'

class Reservation(models.Model):
    date = models.DateField()
    time = models.TimeField()
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    special_requests = models.TextField(blank=True, null=True)
    number_of_people = models.PositiveIntegerField()

    def __str__(self):
        return f'Reservation for {self.number_of_people} on {self.date} at {self.time}'
