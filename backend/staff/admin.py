from django.contrib import admin
from .models import Employee, JobRole, JobSchedule, Issue
# Register your models here.
admin.site.register(Employee)
admin.site.register(JobRole)
admin.site.register(JobSchedule)    
admin.site.register(Issue)