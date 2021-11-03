from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.db.models.expressions import Value
from django.db.models.fields import CharField
from django.utils import timezone
from django.utils import translation
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import BaseUserManager,PermissionsMixin,BaseUserManager

# Create your models here.

class CustomAccountManager(BaseUserManager):

    def create_superuser(self,email,user_name,first_name,password,**other_fields):

        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_superuser',True)
        other_fields.setdefault('is_active',True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=true'
            )
        if other_fields.get('is_superuser')is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=true'
            )
        
        return self.create_user(email,user_name,first_name,password,**other_fields)

    def create_user(self,email,user_name,first_name,password,**other_fields):

        if not email:
            raise ValueError(_('You must provide an email'))

        email=self.normalize_email(email)
        user=self.model(email=email,user_name=user_name,first_name=first_name,**other_fields)
        user.set_password(password)
        user.save()
        return user



class MyUser(AbstractBaseUser,PermissionsMixin):
     
     email = models.EmailField(_('email address'),unique=True)
     user_name = models.CharField(max_length=150,unique=True)
     first_name = models.CharField(max_length=50,blank=True)
     start_date = models.DateTimeField(default=timezone.now)
     about = models.TextField(_('about'),max_length=600,blank=True)
     is_staff = models.BooleanField(default=False)
     is_active = models.BooleanField(default=False)

     objects = CustomAccountManager()

     USERNAME_FIELD = 'email'
     REQUIRED_FIELDS = ['user_name','first_name']

     def __str__(self):
         return self.user_name
     
