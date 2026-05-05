from django.db import models
from users.models import CustomUser
from movies.models import Movie


class Show(models.Model):
    TIME_CHOICES = [
        ('10:00 AM', '10:00 AM'),
        ('1:30 PM', '1:30 PM'),
        ('4:30 PM', '4:30 PM'),
        ('8:00 PM', '8:00 PM'),
    ]
    LABEL_CHOICES = [
        ('morning', 'Morning'),
        ('afternoon', 'Afternoon'),
        ('evening', 'Evening'),
        ('night', 'Night'),
    ]

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='shows')
    date = models.DateField()
    time = models.CharField(max_length=20, choices=TIME_CHOICES)
    label = models.CharField(max_length=20, choices=LABEL_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=250.00)
    total_seats = models.IntegerField(default=80)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('movie', 'date', 'time')
        ordering = ['date', 'time']

    def __str__(self):
        return f"{self.movie.title} - {self.date} {self.time}"


class Booking(models.Model):
    STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookings')
    show = models.ForeignKey(Show, on_delete=models.CASCADE, related_name='bookings')
    seats = models.JSONField()  # ["A1", "A2", "B3"]
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.show} - {self.seats}"

    def save(self, *args, **kwargs):
        self.total_price = len(self.seats) * self.show.price
        super().save(*args, **kwargs)