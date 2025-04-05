from django.contrib import admin
from .models import Train, Coach, Seat, Ticket, Reservation
# Register your models here.
admin.site.register(Train)
admin.site.register(Coach)
admin.site.register(Seat)
admin.site.register(Ticket)
admin.site.register(Reservation)