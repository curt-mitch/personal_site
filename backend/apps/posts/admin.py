from django.contrib import admin
from apps.posts.models import Posts

class PostsAdmin(admin.ModelAdmin):
  list_display = ('title', 'first_sentence', 'publish_date', 'post_link')

# Register your models here.
admin.site.register(Posts, PostsAdmin)
