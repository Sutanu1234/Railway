from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class PassengerManager(BaseUserManager):
    def create_user(self, email, name, date_of_birth, gender, phone_number, street, city, state, zip_code, password=None):
        """Creates and saves a normal user with the given details."""
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            date_of_birth=date_of_birth,
            gender=gender,
            phone_number=phone_number,
            street=street,
            city=city,
            state=state,
            zip_code=zip_code,
        )

        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, date_of_birth, gender, phone_number, street, city, state, zip_code, password=None):
        """Creates and saves a superuser with admin privileges."""
        user = self.create_user(
            email=email,
            name=name,
            date_of_birth=date_of_birth,
            gender=gender,
            phone_number=phone_number,
            street=street,
            city=city,
            state=state,
            zip_code=zip_code,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True  # Needed for Django admin
        user.save(using=self._db)
        return user


class Passenger(AbstractBaseUser, PermissionsMixin):
    passenger_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(verbose_name="email", max_length=255, unique=True)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = PassengerManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "date_of_birth", "gender", "phone_number", "street", "city", "state", "zip_code"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        return self.is_admin or self.is_superuser

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app?"""
        return True
    @property
    def id(self):
        return self.passenger_id


class StaffEmail(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    staff_email = models.EmailField(max_length=255, unique=True)