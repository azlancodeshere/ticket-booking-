from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Show, Booking
from .serializers import ShowSerializer, BookingSerializer
import datetime


@api_view(['GET'])
@permission_classes([AllowAny])
def get_shows_for_movie(request, movie_id):
    today = datetime.date.today()
    date_str = request.query_params.get('date')

    if date_str:
        try:
            filter_date = datetime.date.fromisoformat(date_str)
        except ValueError:
            filter_date = today
    else:
        filter_date = today

    shows = Show.objects.filter(
        movie_id=movie_id,
        date=filter_date,  # ← comma was missing
        is_active=True
    ).order_by('date', 'time')
    serializer = ShowSerializer(shows, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_booked_seats(request, show_id):
    show = get_object_or_404(Show, id=show_id)
    booked_seats = []
    for booking in show.bookings.filter(status='confirmed'):
        booked_seats.extend(booking.seats)
    return Response({'show_id': show_id, 'booked_seats': booked_seats})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    serializer = BookingSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_bookings(request):
    bookings = Booking.objects.filter(
        user=request.user
    ).order_by('-booked_at')
    serializer = BookingSerializer(bookings, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_booking_detail(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id, user=request.user)
    serializer = BookingSerializer(booking, context={'request': request})
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def cancel_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id, user=request.user)
    if booking.status == 'cancelled':
        return Response({'error': 'Already cancelled.'}, status=400)
    booking.status = 'cancelled'
    booking.save()
    return Response({'message': 'Booking cancelled successfully.'})


@api_view(['GET'])
@permission_classes([AllowAny])
def verify_booking(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id)
        return Response({
            'valid': True,
            'booking_id': booking.id,
            'status': booking.status,
            'movie': booking.show.movie.title,
            'show_time': booking.show.time,
            'show_date': str(booking.show.date),
            'seats': booking.seats,
            'total_price': str(booking.total_price),
            'user': booking.user.username,
        })
    except Booking.DoesNotExist:
        return Response({'valid': False, 'message': 'Booking not found'}, status=404)