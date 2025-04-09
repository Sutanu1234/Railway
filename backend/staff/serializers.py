from rest_framework import serializers
from .models import Employee, JobRole, JobSchedule, Issue


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['Employee_id', 'job_role_id', 'user', 'name']
        read_only_fields = ['Employee_id', 'user', 'name']
        



    def get_name(self, obj):
        return getattr(obj.user, 'name', 'N/A')  # fallback if user has no name field

    def validate(self, data):
        request = self.context.get('request')
        if self.instance is None and Employee.objects.filter(user=request.user, job_role_id=data['job_role_id']).exists():
            raise serializers.ValidationError('Employee already exists')
        return data




class JobRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRole
        fields = '__all__'



class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

    def validate(self, data):
        if Issue.objects.filter(problem=data['problem']).exists():
            raise serializers.ValidationError('Issue with this problem already exists')
        return data
    def create(self, validated_data):
        return Issue.objects.create(**validated_data)



class JobScheduleSerializer(serializers.ModelSerializer):
    issue = IssueSerializer()  # show issue details instead of just ID

    class Meta:
        model = JobSchedule
        fields = '__all__'

    def validate(self, data):
        if JobSchedule.objects.filter(train_id=data['train_id'], date=data['date'], employee=data['employee']).exists():
            raise serializers.ValidationError('Job Schedule already exists for this employee on the selected train and date')
        return data

class EmployeeDetailSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    job_title = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['Employee_id', 'name', 'email', 'phone', 'job_title']

    def get_email(self, obj):
        return getattr(obj.user, 'email', 'N/A')

    def get_phone(self, obj):
        return getattr(obj.user, 'phone', 'N/A')  # assumes a phone field exists on User model

    def get_job_title(self, obj):
        return getattr(obj.job_role_id, 'job_role_name', 'N/A')
