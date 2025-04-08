from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer, RegisterSerializer, StaffRegisterSerializer,StaffEmailSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import StaffEmail
from rest_framework.permissions import IsAuthenticated, IsAdminUser


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            passenger = serializer.save()
            tokens = get_tokens_for_user(passenger)
            return Response({**tokens, **serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StaffRegisterView(APIView):
    def post(self, request):
        serializer = StaffRegisterSerializer(data=request.data)
        email=request.data.get('email')
        if StaffEmail.objects.filter(staff_email=email).exists():
            if serializer.is_valid():
                staff = serializer.save()
                tokens = get_tokens_for_user(staff)
                return Response({**tokens, **serializer.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Email not found'}, status=status.HTTP_400_BAD_REQUEST)

class AddStaffEmailView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = StaffEmailSerializer(data=request.data)
        if serializer.is_valid():
            staff_email = serializer.save()
            return Response({
                'message': 'Staff email added successfully',
                'staff_email': StaffEmailSerializer(staff_email).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Failed to add staff email',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)