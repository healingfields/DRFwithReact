from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

app_name='blog_api'

# router = DefaultRouter()
# router.register('',views.PostList,basename='post')
# urlpatterns = router.urls


urlpatterns = [
    path('post/<str:pk>/',views.PostDetail.as_view(),name='postDetail'),
    path('',views.PostList.as_view(),name='postList'),
    path('search/',views.PostSearch.as_view(),name='postSearch'),
    #Post admin urls
    path('admin/create/',views.CreatePost.as_view(),name='createPost'),
    path('admin/edit/postdetail/<int:pk>/',views.AdminPostDetail.as_view(),name='adminPostDetail'),
    path('admin/edit/<int:pk>/',views.EditPost.as_view(),name='editPost'),
    path('admin/delete/<int:pk>/',views.DeletePost.as_view(),name='deletePost')

    
]