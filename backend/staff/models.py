from django.db import models
from django.contrib.auth import get_user_model
from ticketbooking.models import Train
import uuid

User = get_user_model()


class JobRole(models.Model):
    job_role_id = models.CharField(max_length=50, primary_key=True)
    job_role_name = models.CharField(max_length=50)


class Employee(models.Model):
    Employee_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    job_role_id = models.ForeignKey(JobRole, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'job_role_id'], name='unique_employee'),
        ]

class Issue(models.Model):
    issue_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    problem = models.TextField()


class JobSchedule(models.Model):
    record_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    train_id = models.ForeignKey(Train, on_delete=models.CASCADE)
    date = models.DateField()
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['train_id', 'date', 'employee'], name='unique_record'),
        ]

