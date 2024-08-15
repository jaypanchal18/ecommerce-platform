from rest_framework import viewsets,status
from .models import Product, Category
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.permissions import AllowAny

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(seller=user)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        products = Product.objects.filter(seller=user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

