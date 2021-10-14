from django.shortcuts import render
from rest_framework import generics 
from .serializers import PostSerializer
from blog.models import Post
from rest_framework.permissions import BasePermission, IsAdminUser,IsAuthenticatedOrReadOnly, DjangoModelPermissions,SAFE_METHODS


class PostUserWritePermission(BasePermission):
    message = 'Editing post is restricted to the author only'

    def has_object_permission(self,request,view,obj):
        if request.method in SAFE_METHODS:
            return True
        
        return  obj.author == request.user 


# Create your views here.
class PostList(generics.ListCreateAPIView):
    permissions_classes=[IsAuthenticatedOrReadOnly]
    queryset=Post.postobjects.all()
    serializer_class = PostSerializer
    pass

class PostDetail(generics.RetrieveUpdateDestroyAPIView,PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset=Post.objects.all()
    serializer_class = PostSerializer
    pass


