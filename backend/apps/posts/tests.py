from django.test import TestCase
from apps.posts.models import Posts
import datetime

class PostsTestCase(TestCase):
    def setUp(self):
        Posts.objects.create(
            title = 'First Post',
            first_sentence = 'first post sentence',
            publish_date = datetime.datetime(2020, 7, 15),
            post_link = '/link/to/post1'
        )
        Posts.objects.create(
            title = 'Second Post',
            first_sentence = 'second post sentence',
            publish_date = datetime.datetime(2020, 9, 15),
            post_link = '/link/to/post2'
        )

    def test_posts_return_title(self):
        """Posts return own titles"""
        post1 = Posts.objects.get(title="First Post")
        post2 = Posts.objects.get(title="Second Post")
        self.assertEqual(post1._str_(), 'First Post')
        self.assertEqual(post2._str_(), 'Second Post')
