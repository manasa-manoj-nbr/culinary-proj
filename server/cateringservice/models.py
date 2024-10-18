from django.db import models

class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50)  # e.g., Appetizers, Main Course, Desserts
    price = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class CateringOrder(models.Model):
    EVENT_CHOICES = [
        ('wedding', 'Wedding'),
        ('corporate', 'Corporate Event'),
        ('birthday', 'Birthday Party'),
        ('private', 'Private Party'),
        ('other', 'Other')
    ]

    customer_name = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)  # Could be split into phone and email
    date = models.DateField()
    time = models.TimeField()
    number_of_people = models.PositiveIntegerField()
    event = models.CharField(max_length=50, choices=EVENT_CHOICES)  # Event type added here
    menu_items = models.ManyToManyField(MenuItem)
    special_requests = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, default='pending')
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order by {self.customer_name} on {self.date} for {self.event}"

