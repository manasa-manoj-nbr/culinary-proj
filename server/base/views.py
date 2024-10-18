# from django.shortcuts import render
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from .models import UserProfile  # Use your custom model
# from django.contrib.auth import authenticate
# from .serializers import UserSignupSerializer, UserLoginSerializer

# @api_view(['GET'])
# def api_root(request):
#     return Response({
#         'login': 'api/login/',
#         'signup': 'api/signup/'
#     })

# @api_view(['POST'])
# def signup(request):
#     serializer = UserSignupSerializer(data=request.data)

#     if serializer.is_valid():
#         user = serializer.save()  # Save the user into UserProfile model
#         return Response({'success': 'User created successfully.', 'user_id': user.user_id}, status=status.HTTP_201_CREATED)  # Note user_id for UserProfile
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def login(request):
#     serializer = UserLoginSerializer(data=request.data)

#     if serializer.is_valid():
#         email = serializer.validated_data['email']
#         password = serializer.validated_data['password']

#         try:
#             # Authenticate using your custom UserProfile model
#             user = UserProfile.objects.get(email=email)

#             # Check if the password matches
#             if user.check_password(password):  # Assuming you have check_password() for hashed passwords
#                 return Response({'success': 'Logged in successfully.', 'user_id': user.user_id}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)
#         except UserProfile.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# views.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSignupSerializer, UserProfileLoginSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_root(request):
    return Response({
        'signup': '/api/signup/',
        'login': '/api/login/',
    })

@api_view(['POST'])
def signup(request):
    serializer = UserProfileSignupSerializer(data=request.data)

    if serializer.is_valid():
        user_profile = serializer.save()  # Save the user
        return Response({'success': 'User created successfully.', 'user_id': user_profile.user_id}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = UserProfileLoginSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            # Authenticate using email
            user_profile = get_object_or_404(UserProfile, email=email)

            if user_profile.check_password(password):  # Check the hashed password
                return Response({'success': 'Logged in successfully.', 'user_id': user_profile.user_id}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
