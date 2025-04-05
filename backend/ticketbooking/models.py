from django.db import models
import uuid
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.
class Train(models.Model):
    train_id = models.CharField(max_length=50, primary_key=True)
    train_name = models.CharField(max_length=50)
    train_type = models.CharField(max_length=50)

class Coach(models.Model):
    coach_id = models.CharField(max_length=50, primary_key=True)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    coach_type = models.CharField(max_length=50)

class Seat(models.Model):
    seat_id = models.CharField(max_length=50, primary_key=True)
    coach = models.ForeignKey(Coach, on_delete=models.CASCADE)
    seat_type = models.CharField(max_length=50)
    seat_number = models.CharField(max_length=10)

class Ticket(models.Model):
    ticket_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    schedule_id = models.CharField(max_length=50)  # consider making it ForeignKey later
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    date = models.DateField()
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    coach = models.ForeignKey(Coach, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['seat', 'date', 'train', 'coach'], name='unique_seat'),
        ]

class Reservation(models.Model):
    reservation_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    reservation_date = models.DateField()
    created_at = models.DateField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['ticket'], name='unique_ticket'),
        ]
