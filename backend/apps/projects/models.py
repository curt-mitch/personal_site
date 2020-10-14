from django.db import models

# Create your models here.
class Projects(models.Model):
  title = models.CharField(max_length=200)
  description = models.CharField(max_length=200)
  publish_date = models.DateField()
  project_link = models.CharField(max_length=200)

def _str_(self):
  return self.title
