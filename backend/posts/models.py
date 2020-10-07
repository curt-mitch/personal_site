from django.db import models

# Create your models here.
class Posts(models.Model):
  title = models.CharField(max_length=200)
  first_sentence = models.CharField(max_length=200)
  publish_date = models.DateField()
  post_link = models.CharField(max_length=200)

def _str_(self):
  return self.title
