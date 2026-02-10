import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-results.component.html',
  styleUrls: ['./expense-results.component.css']
})
export class ExpenseResultsComponent {
  @Input() detectedAmounts: number[] = [];
  @Input() totalAmount: number = 0;
  @Input() extractedText: string = '';

  showExtractedText = false;

  toggleExtractedText(): void {
    this.showExtractedText = !this.showExtractedText;
  }
}
