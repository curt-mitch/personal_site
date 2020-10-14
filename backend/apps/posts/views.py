from django.shortcuts import render
from rest_framework import viewsets
from apps.posts.serializers import PostsSerializer
from apps.posts.models import Posts

class PostsView(viewsets.ModelViewSet):
  serializer_class = PostsSerializer
  queryset = Posts.objects.all()
