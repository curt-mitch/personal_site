from django.shortcuts import render
from rest_framework import viewsets
from apps.projects.serializers import ProjectsSerializer
from apps.projects.models import Projects

class ProjectsView(viewsets.ModelViewSet):
  serializer_class = ProjectsSerializer
  # return posts in reverse chronological order (newest first)
  queryset = Projects.objects.all().order_by("-publish_date")
