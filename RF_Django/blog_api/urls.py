from os import name
from django.urls import path
from . import views

app_name='blog_api'

urlpatterns = [
    path('<int:pk>/',views.PostDetail.as_view(),name='postDetail'),
    path('',views.PostList.as_view(),name='postList')
]