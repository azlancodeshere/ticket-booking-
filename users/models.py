from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class CustomUser(AbstractUser):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )

    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[\w\s.@+-]+$',  # ← allows spaces
                message="Username can contain letters, numbers, spaces and @/./+/-/_"
            )
        ]
    )
    
    phone = models.CharField(max_length=15, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)

    @property
    def user_type(self):
        if self.age is not None:
            if self.age >= 18:
                return 'Adult'
            else:
                return 'Child'
        return 'Unknown'

    def __str__(self):
        return f"{self.username} - {self.user_type}"