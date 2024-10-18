from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet, CateringOrderViewSet

router = DefaultRouter()
router.register(r'menu-items', MenuItemViewSet)
router.register(r'catering-orders', CateringOrderViewSet)

urlpatterns = router.urls