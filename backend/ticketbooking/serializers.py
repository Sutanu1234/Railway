from rest_framework import serializers
from .models import Train, Coach, Seat, Ticket, Reservation, Passenger
from django.contrib.auth import get_user_model

User = get_user_model()

class TrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = ('train_id', 'train_name', 'train_type')

class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = ('coach_id', 'train', 'coach_type')

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('seat_id', 'coach', 'seat_type', 'seat_number')


# New: Passenger serializer
class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ('name', 'age', 'gender')


# Updated: Ticket serializer
import uuid

class TicketSerializer(serializers.ModelSerializer):
    passenger = PassengerSerializer()
    booked_by = serializers.PrimaryKeyRelatedField(read_only=True)
    schedule_id = serializers.CharField(read_only=True)

    class Meta:
        model = Ticket
        fields = ('ticket_id', 'booked_by', 'passenger', 'schedule_id', 'seat', 'date', 'train', 'coach')

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
        passenger_data = validated_data.pop('passenger')
        passenger = Passenger.objects.create(**passenger_data)

        # Generate schedule_id based on train ID + date + UUID suffix
        train = validated_data['train']
        date = validated_data['date']
        schedule_id = f"{train.train_id}-{date.strftime('%Y%m%d')}-{uuid.uuid4().hex[:6]}"

        return Ticket.objects.create(
            passenger=passenger,
            schedule_id=schedule_id,
            **validated_data
        )



# Updated: Reservation serializer with nested tickets
class ReservationSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True)

    class Meta:
        model = Reservation
        fields = ('reservation_id', 'booked_by', 'reservation_date', 'created_at', 'tickets')
        read_only_fields = ('reservation_id', 'created_at')

    def create(self, validated_data):
        tickets_data = validated_data.pop('tickets')
        reservation = Reservation.objects.create(**validated_data)

        for ticket_data in tickets_data:
            passenger_data = ticket_data.pop('passenger')
            passenger = Passenger.objects.create(**passenger_data)
            ticket = Ticket.objects.create(
                passenger=passenger,
                booked_by=validated_data['booked_by'],
                **ticket_data
            )
            reservation.tickets.add(ticket)

        return reservation
