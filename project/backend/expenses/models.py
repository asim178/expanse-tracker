from django.db import models


class ExpenseRecord(models.Model):
    extracted_text = models.TextField(default='', blank=True)
    detected_amounts = models.JSONField(default=list)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    notes = models.TextField(default='', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'expense_records'
        ordering = ['-created_at']

    def __str__(self):
        return f"Expense Record {self.id} - Total: {self.total_amount}"
