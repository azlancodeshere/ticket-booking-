import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Movie
from bookings.models import Show
from .serializers import MovieSerializer
from bookings.serializers import ShowSerializer   # ← fix import


@api_view(['GET'])
def get_movies(request):
    movies = Movie.objects.filter(is_active=True)
    serializer = MovieSerializer(movies, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def get_movie(request, pk):
    try:
        movie = Movie.objects.get(id=pk, is_active=True)
        serializer = MovieSerializer(movie, context={'request': request})
        return Response(serializer.data)
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_todays_shows(request):
    today = datetime.date.today()
    shows = Show.objects.filter(
        date=today,
        is_active=True
    ).select_related('movie').order_by('time')
    serializer = ShowSerializer(shows, many=True, context={'request': request})
    return Response(serializer.data)