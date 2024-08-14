from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'mobile', 'role')
    list_filter = ('role',)
    search_fields = ('username', 'email', 'mobile')

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['buyer_count'] = CustomUser.objects.filter(role='buyer').count()
        extra_context['seller_count'] = CustomUser.objects.filter(role='seller').count()
        return super().changelist_view(request, extra_context=extra_context)

admin.site.register(CustomUser, CustomUserAdmin)
