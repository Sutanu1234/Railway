from django.urls import path
from .views import LoginView, RegisterView, StaffRegisterView,AddStaffEmailView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('staff-register/', StaffRegisterView.as_view()),
    path('staff-email/', AddStaffEmailView.as_view()),
]
