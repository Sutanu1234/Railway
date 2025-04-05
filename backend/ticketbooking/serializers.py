from rest_framework import serializers
from .models import Train, Coach, Seat, Ticket, Reservation

class TrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = ('train_id', 'train_name', 'train_type')

class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = ('coach_id', 'train_id', 'coach_type')

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('seat_id', 'coach', 'seat_type')

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('ticket_id','passenger','schedule_id','seat','date','train','coach',)

    def validate(self, data):
        seat = data.get('seat')
        date = data.get('date')
        train = data.get('train')
        coach = data.get('coach')

        if seat and date and train and coach:
            if Ticket.objects.filter(seat=seat, date=date, train=train, coach=coach).exists():
                raise serializers.ValidationError("This seat is already booked for the given train, coach, and date.")
        return data


    def create(self, validated_data):
        return Ticket.objects.create(**validated_data)

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('reservation_id', 'passenger', 'ticket', 'reservation_date')
    def create(self, validated_data):
        return Reservation.objects.create(**validated_data)