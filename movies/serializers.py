from rest_framework import serializers
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    poster = serializers.SerializerMethodField()

    def get_poster(self, obj):
        request = self.context.get('request')
        if obj.poster and request:
            return request.build_absolute_uri(obj.poster.url)
        return None

    class Meta:
        model = Movie
        fields = '__all__'