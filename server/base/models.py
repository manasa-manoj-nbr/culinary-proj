# models.py
from django.db import models
from django.contrib.auth.hashers import check_password

class UserProfile(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=128)  # Store hashed passwords

    class Meta:
        db_table = 'user_profile'  # Name of the table in the database

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
