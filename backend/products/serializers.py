from rest_framework import serializers
from .models import Product, Category
import requests

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price',  'image','category']


        def get_image_url(self, obj):
           request = self.context.get('request')
           image_url = obj.image.url
           return request.build_absolute_uri(image_url)  # Use this if you need full URL

    

    def validate_image(self, image):
        if not image:
            raise serializers.ValidationError("Image is required")
        # Check if the file is actually an image
        if not image.name.endswith(('.png', '.jpg', '.jpeg')):
            raise serializers.ValidationError("Unsupported file extension. Please upload a PNG, JPG, or JPEG image.")
        return image