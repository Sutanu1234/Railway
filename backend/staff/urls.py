from django.urls import path
from .views import (
    EmployeeList, JobRoleList, UpdateJobRole, JobScheduleList, JobScheduleCreate, IssueList, IssueCreate, AllEmployeeDetailView
)

urlpatterns = [
    path('employees/', EmployeeList.as_view(), name='employee-list'),
    path('employees/details/', AllEmployeeDetailView.as_view()),
    path('employees/<str:pk>/', UpdateJobRole.as_view(), name='update-job-role'),
    path('job-roles/', JobRoleList.as_view(), name='job-role-list'),
    path('job-schedules/', JobScheduleList.as_view(), name='job-schedule-list'),
    path('job-schedules-create/', JobScheduleCreate.as_view(), name='job-schedule-create'),
    path('issues/', IssueList.as_view(), name='issue-list'),
    path('issue-create/', IssueCreate.as_view(), name='issue-create')

]
