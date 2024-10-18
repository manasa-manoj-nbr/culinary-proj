# from rest_framework import serializers
# from .models import UserProfile

# class UserSignupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile  # Use your custom model
#         fields = ['username', 'email', 'password']
#         extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

#     def create(self, validated_data):
#         # Create and save user with hashed password
#         user_profile = UserProfile(
#             username=validated_data['username'],
#             email=validated_data['email']
#         )
#         user_profile.set_password(validated_data['password'])  # Manually set hashed password if needed
#         user_profile.save()
#         return user_profile


# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()

#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')

#         try:
#             # Authenticate using your custom UserProfile model
#             user = UserProfile.objects.get(email=email)

#             # Compare passwords
#             if user.check_password(password):  # Ensure password is hashed
#                 return user
#             else:
#                 raise serializers.ValidationError('Invalid credentials')
#         except UserProfile.DoesNotExist:
#             raise serializers.ValidationError('User not found')


# serializers.py
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import UserProfile

class UserProfileSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])  # Use Django's hashing utility
        user_profile = UserProfile.objects.create(**validated_data)
        return user_profile

class UserProfileLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
