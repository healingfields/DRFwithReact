from os import name
from django.test import TestCase
from django.contrib.auth.models import User
from blog.models import Post,Category

# Create your tests here.
class Test_Create_Post(TestCase):

    @classmethod
    def setUpTestData(cls):
        test_category=Category.objects.create(name='django')
        test_user=User.objects.create(
            username='test_user1',password='1234')
        test_Post=Post.objects.create(category_id=1,title='post title',
            excerpt='post excerpt',content='post content',
            slug='post-title',author_id=1,status='published'
            )
    
    def test_blog_content(self):
        post = Post.postobjects.get(id=1)
        cat = Category.objects.get(id=1)
        author = f'{post.author}'
        excerpt = f'{post.excerpt}'
        title = f'{post.title}'
        content = f'{post.content}'
        status = f'{post.status}'
        self.assertEqual(author,'test_user1')
        self.assertEqual(title,'post title')
        self.assertEqual(content,'post content')
        self.assertEqual(status,'published')
        self.assertEqual(str(post),'post title')
        self.assertEqual(str(cat),'django')


         

 