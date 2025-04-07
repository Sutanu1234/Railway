from rest_framework import serializers
from .models import Employee, JobRole, JobSchedule, Issue


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['Employee_id', 'user', 'job_role_id', 'name']

    def get_name(self, obj):
        return getattr(obj.user, 'name', 'N/A')  # fallback if user has no name field

    def validate(self, data):
        if self.instance is None and Employee.objects.filter(user=data['user'], job_role_id=data['job_role_id']).exists():
            raise serializers.ValidationError('Employee already exists')
        return data


class JobRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRole
        fields = '__all__'


class JobScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSchedule
        fields = '__all__'

    def validate(self, data):
        if JobSchedule.objects.filter(train_id=data['train_id'], date=data['date'], employee=data['employee']).exists():
            raise serializers.ValidationError('Job Schedule already exists')
        return data


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

    def validate(self, data):
        if Issue.objects.filter(record_id=data['record_id'], issue_reported=data['issue_reported']).exists():
            raise serializers.ValidationError('Issue already exists')
        return data
