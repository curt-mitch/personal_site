"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from apps.posts.views import PostsView
from apps.projects.views import ProjectsView

from apps.jp_en_endpoints.urls import urlpatterns as jp_en_endpoints_urlpatterns
from apps.urdu_letter_endpoints.urls import urlpatterns as urdu_letter_endpoints_urlpatterns

router = routers.DefaultRouter()
router.register(r'posts', PostsView, 'posts')
router.register(r'projects', ProjectsView, 'projects')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]

urlpatterns += jp_en_endpoints_urlpatterns
urlpatterns += urdu_letter_endpoints_urlpatterns
