from django.contrib import admin
from apps.projects.models import Projects

class ProjectsAdmin(admin.ModelAdmin):
  list_display = ('title', 'description', 'publish_date', 'project_link')

# Register your models here.
admin.site.register(Projects, ProjectsAdmin)
