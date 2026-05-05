from django.db import models

class Movie(models.Model):
    GENRE_CHOICES = [
        ('action', 'Action'),
        ('comedy', 'Comedy'),
        ('drama', 'Drama'),
        ('horror', 'Horror'),
        ('sci_fi', 'Sci-Fi'),
        ('romance', 'Romance'),
        ('thriller', 'Thriller'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    genre = models.CharField(max_length=50, choices=GENRE_CHOICES)
    duration = models.IntegerField(help_text="Duration in minutes")
    release_date = models.DateField()
    poster = models.ImageField(upload_to='posters/', blank=True, null=True)
    rating = models.FloatField(default=0.0)
    language = models.CharField(max_length=50, default='English')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
    


