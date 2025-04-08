from django.urls import path
from .views import (
    TicketbookingView,
    TrainUpdateView, TrainDetailView,
    CoachUpdateView, CoachDetailView,
    SeatUpdateView, SeatDetailView,
    ReviewListCreateView, ReviewDetailView,
)

urlpatterns = [
    # Ticket Booking
    path('book/', TicketbookingView.as_view(), name='book-ticket'),

    # Train Endpoints
    path('trains/', TrainUpdateView.as_view(), name='train-list-create'),
    path('trains/<str:pk>/', TrainDetailView.as_view(), name='train-detail'),

    # Coach Endpoints
    path('coaches/', CoachUpdateView.as_view(), name='coach-list-create'),
    path('coaches/<str:pk>/', CoachDetailView.as_view(), name='coach-detail'),

    # Seat Endpoints
    path('seats/', SeatUpdateView.as_view(), name='seat-list-create'),
    path('seats/<str:pk>/', SeatDetailView.as_view(), name='seat-detail'),

    # Review Endpoints
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('reviews/<str:pk>/', ReviewDetailView.as_view(), name='review-detail'),

]
