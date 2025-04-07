from django.shortcuts import render
from ticketbooking.permissions import IsStaff
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import EmployeeSerializer, JobRoleSerializer, JobScheduleSerializer, IssueSerializer
from .models import Employee, JobRole, JobSchedule, Issue
from django.http import Http404


class EmployeeList(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated(), IsAdminUser()]
        elif self.request.method == 'POST':
            return [IsAuthenticated(), IsStaff()]
        else:
            return [IsAuthenticated(), IsAdminUser()]

    def get(self, request):
        user = request.user
        employee = Employee.objects.filter(user=user)
        serializer = EmployeeSerializer(employee, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



class JobRoleList(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        job_role = JobRole.objects.all()
        serializer = JobRoleSerializer(job_role, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JobRoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class UpdateJobRole(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_object(self, pk):
        try:
            return JobRole.objects.get(pk=pk)
        except JobRole.DoesNotExist:
            raise Http404

    def put(self, request, pk):
        job_role_name = request.data.get('job_role_name')
        job_role = self.get_object(pk)
        job_role.job_role_name = job_role_name
        job_role.save()
        return Response({"message": "Job Role updated successfully"}, status=200)

    def delete(self, request, pk):
        job_role = self.get_object(pk)
        job_role.delete()
        return Response({"message": "Job Role deleted successfully"}, status=204)


class JobScheduleList(APIView):
    permission_classes = [IsAuthenticated, IsStaff]

    def get(self, request):
        job_schedule = JobSchedule.objects.filter(employee__user=request.user)
        serializer = JobScheduleSerializer(job_schedule, many=True)
        return Response(serializer.data)


class JobScheduleCreate(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = JobScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class IssueList(APIView):
    permission_classes = [IsAuthenticated, IsStaff]

    def get(self, request):
        issue = JobSchedule.objects.filter(record_id__employee__user=request.user)
        serializer = IssueSerializer(issue, many=True)
        return Response(serializer.data)


class IssueCreate(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = IssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
