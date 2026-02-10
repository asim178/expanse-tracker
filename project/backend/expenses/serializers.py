from rest_framework import serializers
from .models import ExpenseRecord


class ExpenseRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseRecord
        fields = ['id', 'extracted_text', 'detected_amounts', 'total_amount', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at']
