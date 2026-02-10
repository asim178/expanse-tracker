import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService, ExpenseRecord } from '../../services/expense.service';

@Component({
  selector: 'app-expense-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css']
})
export class ExpenseHistoryComponent implements OnInit, OnChanges {
  @Input() refresh: number = 0;

  records: ExpenseRecord[] = [];
  loading = true;
  error: string | null = null;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refresh'] && !changes['refresh'].firstChange) {
      this.loadRecords();
    }
  }

  loadRecords(): void {
    this.loading = true;
    this.error = null;

    this.expenseService.getExpenseRecords().subscribe({
      next: (data) => {
        this.records = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading records:', error);
        this.error = 'Failed to load expense records';
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
