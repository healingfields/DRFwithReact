from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

app_name='blog_api'

# router = DefaultRouter()
# router.register('',views.PostList,basename='post')
# urlpatterns = router.urls


urlpatterns = [
    path('post/',views.PostDetail.as_view(),name='postDetail'),
    path('',views.PostList.as_view(),name='postList'),
    path('search/',views.PostSearch.as_view(),name='postSearch'),
]