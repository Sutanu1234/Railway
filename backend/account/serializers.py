from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Passenger,StaffEmail

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(request=self.context.get('request'), username=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid email or password")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "passenger_id": user.passenger_id,
                "email": user.email,
                "name": user.name,
                "date_of_birth": user.date_of_birth,
                "gender": user.gender,
                "phone_number": user.phone_number,
                "street": user.street,
                "city": user.city,
                "state": user.state,
                "zip_code": user.zip_code,
                "is_admin": user.is_admin,
                "is_staff": user.is_staff,
            },
        }

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField()
    date_of_birth = serializers.DateField()
    gender = serializers.CharField()
    phone_number = serializers.CharField()
    street = serializers.CharField()
    city = serializers.CharField()
    state = serializers.CharField()
    zip_code = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")

        if Passenger.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists")

        return data

    def create(self, validated_data):
        return Passenger.objects.create_user(**validated_data)

class StaffRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField()
    date_of_birth = serializers.DateField()
    gender = serializers.CharField()
    phone_number = serializers.CharField()
    street = serializers.CharField()
    city = serializers.CharField()
    state = serializers.CharField()
    zip_code = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")

        if Passenger.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists")

        return data

    def create(self, validated_data):
        user = Passenger.objects.create_user(**validated_data)
        user.is_staff = True  # Ensure staff users are marked correctly
        user.save()
        return user

class StaffEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffEmail
        fields = ['id', 'staff_email']