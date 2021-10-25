from django.urls import path
from .views import  CustomUserCreate,BlackListTokenUpdateView

app_name = 'users'

urlpatterns = [
    path('register/',CustomUserCreate.as_view(),name="create_user"),
    path('logout/blacklist/',BlackListTokenUpdateView.as_view(),name='blacklist'),
]
