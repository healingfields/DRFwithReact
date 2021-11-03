from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404, render
from rest_framework import generics 
from .serializers import PostSerializer
from blog.models import Post
from rest_framework import filters
from rest_framework  import viewsets
from rest_framework.response  import Response
from rest_framework.permissions import AllowAny, IsAuthenticated ,BasePermission, IsAdminUser,IsAuthenticatedOrReadOnly, DjangoModelPermissions,SAFE_METHODS


class PostUserWritePermission(BasePermission):
    message = 'Editing post is restricted to the author only'

    def has_object_permission(self,request,view,obj):
        if request.method in SAFE_METHODS:
            return True
        
        return  obj.author == request.user 

class PostList(generics.ListAPIView,PostUserWritePermission):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)
    

class PostDetail(generics.ListAPIView):
  
    serializer_class = PostSerializer
  
    def get_queryset(self):
        slug = self.request.query_params.get('slug',None)
        print(slug)
        return Post.objects.filter(slug=slug)

class PostSearch(generics.ListAPIView):
    queryset=Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.

       




# Create your views here.
# class PostList(generics.ListCreateAPIView):
#     permissions_classes=[IsAuthenticatedOrReadOnly]
#     queryset=Post.postobjects.all()
#     serializer_class = PostSerializer
#     pass

# class PostDetail(generics.RetrieveUpdateDestroyAPIView,PostUserWritePermission):
#     permission_classes = [PostUserWritePermission]
#     queryset=Post.objects.all()
#     serializer_class = PostSerializer
#     pass

# class PostList(viewsets.ViewSet):
#     permissions_classes = [IsAuthenticated]
#     queryset = Post.postobjects.all()
    

#     def list(self,request):
#         serializer_class=PostSerializer(self.queryset,many=True)
#         return Response(serializer_class.data)

#     def retrieve(self,request,pk=None):
#         post = get_object_or_404(self.queryset,pk=pk)
#         serializer_class=PostSerializer(post)
#         return Response(serializer_class.data)
        





