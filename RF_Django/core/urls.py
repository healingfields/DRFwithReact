from os import name, stat
from django import VERSION, urls
from django.contrib import admin
from django.urls import path,include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #Oauth
    path('auth/',include('drf_social_oauth2.urls',namespace='drf')),
    #DRF auth urls
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
    #token urls
    # path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    # path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    #My Admin Api Url
    path('admin/', admin.site.urls),
    #Blog_Api urls
    path('api/',include('blog_api.urls',namespace='blog_api')),
    #User Management
    path('api/user/',include('users.urls',namespace='users')),
    #Api schema and documentation
    path('docs/',include_docs_urls(title='BlogAPI')),
    path('apiSchema',get_schema_view(
        title="BlogApi",
        description="documentation for the blog api",
        version="1.0.0"
    ),name="apiSchema"),
]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)