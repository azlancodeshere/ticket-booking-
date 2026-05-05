from rest_framework import serializers
from .models import Show, Booking


class ShowSerializer(serializers.ModelSerializer):
    movie_title = serializers.CharField(source='movie.title', read_only=True)
    movie_poster = serializers.SerializerMethodField() 
    booked_seats = serializers.SerializerMethodField()
    available_seats = serializers.SerializerMethodField()

    def get_movie_poster(self, obj):                   
        request = self.context.get('request')
        if obj.movie.poster and request:
            return request.build_absolute_uri(obj.movie.poster.url)
        return None

    def get_booked_seats(self, obj):
        seats = []
        for booking in obj.bookings.filter(status='confirmed'):
            seats.extend(booking.seats)
        return seats

    def get_available_seats(self, obj):
        return obj.total_seats - len(self.get_booked_seats(obj))

    class Meta:
        model = Show
        fields = [
            'id', 'movie', 'movie_title', 'movie_poster', 
            'date', 'time', 'label', 'price', 'total_seats',
            'booked_seats', 'available_seats', 'is_active'
        ]


class BookingSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    movie_title = serializers.CharField(source='show.movie.title', read_only=True)
    movie_poster = serializers.SerializerMethodField()
    show_time = serializers.CharField(source='show.time', read_only=True)
    show_date = serializers.DateField(source='show.date', read_only=True)
    show_label = serializers.CharField(source='show.label', read_only=True)

    def get_movie_poster(self, obj):
        request = self.context.get('request')
        if obj.show.movie.poster and request:
            return request.build_absolute_uri(obj.show.movie.poster.url)
        return None

    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'show', 'movie_title', 'movie_poster',
            'show_time', 'show_date', 'show_label',
            'seats', 'total_price', 'status', 'booked_at'
        ]
        read_only_fields = ['total_price', 'booked_at', 'user']

    def validate(self, data):
        show = data.get('show')
        seats = data.get('seats')

        if not seats or len(seats) == 0:
            raise serializers.ValidationError("Please select at least one seat.")

        if len(seats) > 8:
            raise serializers.ValidationError("Maximum 8 seats per booking.")

        booked_seats = []
        for booking in show.bookings.filter(status='confirmed'):
            booked_seats.extend(booking.seats)

        conflicts = [s for s in seats if s in booked_seats]
        if conflicts:
            raise serializers.ValidationError(
                f"Seats {', '.join(conflicts)} are already booked. Please choose different seats."
            )

        return data