from rest_framework import serializers
from apps.projects.models import Projects

class ProjectsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Projects
    fields = ('id', 'title', 'description', 'publish_date', 'project_link')
