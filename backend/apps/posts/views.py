from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PostsSerializer
from .models import Posts

class PostsView(viewsets.ModelViewSet):
  serializer_class = PostsSerializer
  queryset = Posts.objects.all()
