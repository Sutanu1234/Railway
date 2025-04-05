from django.contrib import admin
from .models import Passenger

class PassengerAdmin(admin.ModelAdmin):
    list_display = ("passenger_id", "name", "email", "phone_number", "city", "state")
    search_fields = ("name", "email", "phone_number")
    ordering = ("passenger_id",)
    list_filter = ("city", "state")

admin.site.register(Passenger, PassengerAdmin)
