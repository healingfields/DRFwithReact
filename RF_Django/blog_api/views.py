from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404, render
from rest_framework import generics 
from .serializers import PostSerializer
from rest_framework.views import APIView
from blog.models import Post
from rest_framework import filters
from rest_framework  import viewsets
from rest_framework.response  import Response
from rest_framework.permissions import AllowAny, IsAuthenticated ,BasePermission, IsAdminUser,IsAuthenticatedOrReadOnly, DjangoModelPermissions,SAFE_METHODS
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status


# class PostUserWritePermission(BasePermission):
#     message = 'Editing post is restricted to the author only'

#     def has_object_permission(self,request,view,obj):
#         if request.method in SAFE_METHODS:
#             return True
        
#         return  obj.author == request.user 

class PostList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    permission_class = [IsAdminUser]

    def get_queryset(self):
     #   user = self.request.user
        return Post.objects.all()
    
class PostDetail(generics.RetrieveAPIView):
  
    serializer_class = PostSerializer
  
    def get_object(self,queryset=None,**kwargs):
        item_slug =self.kwargs.get('pk')
        return get_object_or_404(Post,slug=item_slug)

class PostSearch(generics.ListAPIView):
    queryset=Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.

# class CreatePost(generics.CreateAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

class CreatePost(APIView):
    # permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser,FormParser]

    def post(self,request,format=None):
        print(request.data)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminPostDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer 
 
class EditPost(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

       




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
        





