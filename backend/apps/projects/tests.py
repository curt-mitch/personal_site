from django.test import TestCase
from apps.projects.models import Projects
import datetime

class PostsTestCase(TestCase):
    def setUp(self):
        Projects.objects.create(
            title = 'Project 1',
            description = 'description of first project',
            publish_date = datetime.datetime(2020, 8, 15),
            project_link = '/link/to/project1'
        )
        Projects.objects.create(
            title = 'Project 2',
            description = 'description of second project',
            publish_date = datetime.datetime(2020, 10, 15),
            project_link = '/link/to/project2'
        )

    def test_projects_return_title(self):
        """Projects return own titles"""
        project1 = Projects.objects.get(title="Project 1")
        project2 = Projects.objects.get(title="Project 2")
        self.assertEqual(project1._str_(), 'Project 1')
        self.assertEqual(project2._str_(), 'Project 2')
