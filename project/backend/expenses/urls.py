from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseRecordViewSet

router = DefaultRouter()
router.register(r'records', ExpenseRecordViewSet, basename='expense-record')

urlpatterns = [
    path('', include(router.urls)),
]
