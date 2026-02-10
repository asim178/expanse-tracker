import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ExpenseResultsComponent } from './components/expense-results/expense-results.component';
import { ExpenseHistoryComponent } from './components/expense-history/expense-history.component';
import { OcrService } from './services/ocr.service';
import { ExpenseService, ExpenseRecord } from './services/expense.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ImageUploadComponent,
    ExpenseResultsComponent,
    ExpenseHistoryComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Expense OCR Tracker';
  isProcessing = false;
  detectedAmounts: number[] = [];
  totalAmount = 0;
  extractedText = '';
  error: string | null = null;
  refreshHistory = 0;

  constructor(
    private ocrService: OcrService,
    private expenseService: ExpenseService
  ) {}

  async handleImageSelect(file: File): Promise<void> {
    this.isProcessing = true;
    this.error = null;

    try {
      const ocrResult = await this.ocrService.processImage(file);
      const numbers = this.ocrService.extractNumbers(ocrResult.text);
      const total = this.ocrService.calculateTotal(numbers);

      const record: ExpenseRecord = {
        extracted_text: ocrResult.text,
        detected_amounts: numbers,
        total_amount: total,
        notes: ''
      };

      this.expenseService.createExpenseRecord(record).subscribe({
        next: () => {
          this.detectedAmounts = numbers;
          this.totalAmount = total;
          this.extractedText = ocrResult.text;
          this.isProcessing = false;
          this.refreshHistory++;
        },
        error: (error) => {
          console.error('Error saving record:', error);
          this.error = 'Failed to save expense record';
          this.isProcessing = false;
        }
      });
    } catch (error) {
      console.error('OCR processing error:', error);
      this.error = 'Failed to process image';
      this.isProcessing = false;
    }
  }
}
