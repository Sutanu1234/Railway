from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny,IsAdminUser
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

    def delete(self, request, pk):
        try:
            reservation = Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            return Response({"error": "Reservation not found"}, status=404)

        if reservation.booked_by != request.user:
            return Response({"error": "You are not authorized to delete this reservation"}, status=403)

        reservation.delete()
        return Response({"message": "Reservation deleted successfully"}, status=204)


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
            'train': request.data.get('train'),
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
        train_id = request.data.get('train')
        try:
            train = Train.objects.get(train_id=train_id)
        except Train.DoesNotExist:
            return Response({'error': 'Train with this ID does not exist'}, status=400)

        data = request.data.copy()
        data['train'] = train_id  # ensure it's the correct type

        serializer = CoachSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SeatUpdateView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsAdminUser()]
        return [AllowAny()]

    def get(self, request):
        seats = Seat.objects.all()
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data)

    def post(self, request):
        coach_id = request.data.get('coach_id')

        # Validate if coach exists
        try:
            Coach.objects.get(pk=coach_id)
        except Coach.DoesNotExist:
            return Response({'error': 'Coach with this ID does not exist'}, status=400)

        seat_data = {
            'seat_id': request.data.get('seat_id'),
            'coach': coach_id,  # FK should match serializer field name
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
            return [IsAuthenticated(), IsAdminUser()]
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
            return [IsAuthenticated(), IsAdminUser()]
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


class ReviewView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        elif self.request.method in ['PUT', 'DELETE']:
            return [IsAuthenticated(), ]
        return [AllowAny()]

    def get(self, request, *args, **kwargs):
        # Return all reviews or one, depending on your design
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(passenger=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, pk, *args, **kwargs):
        review = get_object_or_404(Review, pk=pk)
        self.check_object_permissions(request, review)
        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(passenger=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk, *args, **kwargs):
        review = get_object_or_404(Review, pk=pk)
        self.check_object_permissions(request, review)
        review.delete()
        return Response(status=204)