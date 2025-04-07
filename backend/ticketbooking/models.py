from django.db import models
import uuid
from django.contrib.auth import get_user_model

User = get_user_model()

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

class Passenger(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10)
    # Optionally: add ID proof or phone number

class Ticket(models.Model):
    ticket_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booked_by = models.ForeignKey(User, on_delete=models.CASCADE)  # The user who books
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)  # Actual traveler
    schedule_id = models.CharField(max_length=50)  # Consider making it a FK
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    date = models.DateField()
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    coach = models.ForeignKey(Coach, on_delete=models.CASCADE)
    starting_point = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['seat', 'date', 'train', 'coach'], name='unique_seat'),
        ]

class Reservation(models.Model):
    reservation_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    reservation_date = models.DateField()
    created_at = models.DateField(auto_now=True)
    tickets = models.ManyToManyField(Ticket)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['reservation_id'], name='unique_reservation'),
        ]

class Review(models.Model):
    review_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    passenger_id = models.ForeignKey(User, on_delete=models.CASCADE)
    train_id = models.ForeignKey(Train, on_delete=models.CASCADE)
    comments = models.TextField()
    rating = models.PositiveSmallIntegerField()
    def __str__(self):
        return f"{self.passenger_id.name} - {self.train_id.train_name} ({self.rating}/5)"

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(rating__gte=1, rating__lte=5), name='valid_rating_range'),
            models.UniqueConstraint(fields=['passenger_id', 'train_id'], name='unique_review'),
        ]



# class email_staff(models.Model):
#     unique_email = 