from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Ticket, Reservation, Train, Coach, Seat
from .serializers import TicketSerializer, ReservationSerializer, TrainSerializer, CoachSerializer, SeatSerializer
from .permissions import IsStaff


class TicketbookingView(APIView):
    def post(self, request):
        data = request.data.copy()
        data['booked_by'] = request.user.id  # Automatically assign the current user

        serializer = ReservationSerializer(data=data)
        if serializer.is_valid():
            reservation = serializer.save()
            return Response(ReservationSerializer(reservation).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = request.user
        reservations = Reservation.objects.filter(booked_by=user).order_by('-created_at')
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TrainUpdateView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsStaff()]
        return [AllowAny()]

    def get(self, request):
        trains = Train.objects.all()
        serializer = TrainSerializer(trains, many=True)
        return Response(serializer.data)

    def post(self, request):
        train_data = {
            'train_id': request.data.get('train_id'),
            'train_name': request.data.get('train_name'),
            'train_type': request.data.get('train_type'),
        }
        train_serializer = TrainSerializer(data=train_data)
        if train_serializer.is_valid():
            train_serializer.save()
            return Response({
                'message': 'Train created successfully',
                'train': train_serializer.data,
            }, status=status.HTTP_201_CREATED)
        return Response(train_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CoachUpdateView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsStaff()]
        return [AllowAny()]

    def get(self, request):
        coaches = Coach.objects.all()
        serializer = CoachSerializer(coaches, many=True)
        return Response(serializer.data)

    def post(self, request):
        coach_data = {
            'coach_id': request.data.get('coach_id'),
            'train_id': request.data.get('train_id'),
            'coach_type': request.data.get('coach_type'),
        }
        coach_serializer = CoachSerializer(data=coach_data)
        if coach_serializer.is_valid():
            coach_serializer.save()
            return Response({
                'message': 'Coach created successfully',
                'coach': coach_serializer.data,
            }, status=status.HTTP_201_CREATED)
        return Response(coach_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SeatUpdateView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsStaff()]
        return [AllowAny()]

    def get(self, request):
        seats = Seat.objects.all()
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data)

    def post(self, request):
        seat_data = {
            'seat_id': request.data.get('seat_id'),
            'coach_id': request.data.get('coach_id'),
            'seat_type': request.data.get('seat_type'),
            'seat_number': request.data.get('seat_number'),
        }
        seat_serializer = SeatSerializer(data=seat_data)
        if seat_serializer.is_valid():
            seat_serializer.save()
            return Response({
                'message': 'Seat created successfully',
                'seat': seat_serializer.data,
            }, status=status.HTTP_201_CREATED)
        return Response(seat_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TrainDetailView(APIView):
    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [IsAuthenticated(), IsStaff()]
        return [AllowAny()]

    def get_object(self, pk):
        try:
            return Train.objects.get(pk=pk)
        except Train.DoesNotExist:
            return None

    def get(self, request, pk):
        train = self.get_object(pk)
        if not train:
            return Response({"error": "Train not found"}, status=404)
        serializer = TrainSerializer(train)
        return Response(serializer.data)

    def put(self, request, pk):
        train = self.get_object(pk)
        if not train:
            return Response({"error": "Train not found"}, status=404)
        serializer = TrainSerializer(train, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Train updated successfully",
                "train": serializer.data
            })
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        train = self.get_object(pk)
        if not train:
            return Response({"error": "Train not found"}, status=404)
        train.delete()
        return Response({"message": "Train deleted successfully"}, status=204)


class CoachDetailView(APIView):
    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [IsAuthenticated(), IsStaff()]
        return [AllowAny()]

    def get_object(self, pk):
        try:
            return Coach.objects.get(pk=pk)
        except Coach.DoesNotExist:
            return None

    def get(self, request, pk):
        coach = self.get_object(pk)
        if not coach:
            return Response({"error": "Coach not found"}, status=404)
        serializer = CoachSerializer(coach)
        return Response(serializer.data)

    def put(self, request, pk):
        coach = self.get_object(pk)
        if not coach:
            return Response({"error": "Coach not found"}, status=404)
        serializer = CoachSerializer(coach, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Coach updated successfully",
                "coach": serializer.data
            })
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        coach = self.get_object(pk)
        if not coach:
            return Response({"error": "Coach not found"}, status=404)
        coach.delete()
        return Response({"message": "Coach deleted successfully"}, status=204)


class SeatDetailView(APIView):
    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [IsAuthenticated(), IsStaff()]
        return [AllowAny()]

    def get_object(self, pk):
        try:
            return Seat.objects.get(pk=pk)
        except Seat.DoesNotExist:
            return None

    def get(self, request, pk):
        seat = self.get_object(pk)
        if not seat:
            return Response({"error": "Seat not found"}, status=404)
        serializer = SeatSerializer(seat)
        return Response(serializer.data)

    def put(self, request, pk):
        seat = self.get_object(pk)
        if not seat:
            return Response({"error": "Seat not found"}, status=404)
        serializer = SeatSerializer(seat, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Seat updated successfully",
                "seat": serializer.data
            })
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        seat = self.get_object(pk)
        if not seat:
            return Response({"error": "Seat not found"}, status=404)
        seat.delete()
        return Response({"message": "Seat deleted successfully"}, status=204)
