from django.urls import path
from . import views

urlpatterns = [
    path('movies/<int:movie_id>/shows/', views.get_shows_for_movie),
    path('shows/<int:show_id>/booked-seats/', views.get_booked_seats),
    path('bookings/', views.create_booking),
    path('bookings/my/', views.get_my_bookings),
    path('bookings/<int:booking_id>/', views.get_booking_detail),
    path('bookings/<int:booking_id>/cancel/', views.cancel_booking),
    path('bookings/<int:booking_id>/verify/', views.verify_booking), 
]