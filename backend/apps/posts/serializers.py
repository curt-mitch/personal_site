from rest_framework import serializers
from apps.posts.models import Posts

class PostsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Posts
    fields = ('id', 'title', 'first_sentence', 'publish_date', 'post_link')
