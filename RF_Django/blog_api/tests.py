from django.http import response
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase , APIClient
from blog.models import Category,Post
from django.contrib.auth.models import User

class PostTests(APITestCase):

    def test_view_posts(self):
        url =reverse('blog_api:postList')
        response = self.client.get(url,format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def create_post(self):
        self.test_category = Category.objects.create(name='django')
        self.test_user1=User.objects.create(username='testuser1',password='1234')
        data={
            "title":"new",
            "author":1,
            "excerpt":"new",
            "content":"new"
        }
        url = reverse('blog_api:listcreate')
        response= self.client.get(url,data,format='json')
        self.asserEqual(response.status_code,status.HTTP_201_CREATED)
    
    def test_post_update(self):
        client = APIClient()

        self.test_category = Category.objects.create(name='laravel')
        self.test_user1=User.objects.create_user(
                username='user1',password='1234idriss'
        )
        self.test_user2=User.objects.create_user(
                username='user2',password='1234idriss'
        )
        self.test_post=Post.objects.create(
                category_id=1,title='post1',excerpt='hello world',content='hello world',author_id=1,status='published',slug='post_1'
        )
        
        client.login(username=self.test_user1.username,
                    password='1234idriss')
        url = reverse(('blog_api:postDetail'),kwargs={'pk':1})
        response = client.put(
            url,{
                "title":"updated",
                "author":1,
                "excerpt":"updated",
                "content":"updated",
                "status":"published"
            },format='json')
        print(response.data)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
    

        


