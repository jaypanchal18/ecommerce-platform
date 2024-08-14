# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class Address(models.Model):
    user = models.ForeignKey('CustomUser', related_name='addresses', on_delete=models.CASCADE)
    address = models.TextField()
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return self.address

class CustomUser(AbstractUser):
    mobile = models.CharField(max_length=15, blank=True, null=True, unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=[('admin', 'Admin'), ('seller', 'Seller'), ('buyer', 'Buyer')], default='admin')

    def __str__(self):
        return self.username
