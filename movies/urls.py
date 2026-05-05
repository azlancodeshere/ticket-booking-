from django.urls import path
from . import views

urlpatterns = [    
    path('movies/', views.get_movies),                       
    path('movies/<int:pk>/', views.get_movie),
     path('shows/today/', views.get_todays_shows),
]