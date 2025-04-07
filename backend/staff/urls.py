from django.urls import path
from .views import (
    EmployeeList, JobRoleList, UpdateJobRole, JobScheduleList, JobScheduleCreate, IssueList, IssueCreate
)

urlpatterns = [
    path('employees/', EmployeeList.as_view(), name='employee-list'),
    path('employees/<int:pk>/', UpdateJobRole.as_view(), name='update-job-role'),
    path('job-roles/', JobRoleList.as_view(), name='job-role-list'),
    path('job-schedules/', JobScheduleList.as_view(), name='job-schedule-list'),
    path('job-schedules/', JobScheduleCreate.as_view(), name='job-schedule-create'),
    path('issues/', IssueList.as_view(), name='issue-list'),
    path('issue-create/', IssueCreate.as_view(), name='issue-create'),
]
