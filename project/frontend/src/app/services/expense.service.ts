import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExpenseRecord {
  id?: number;
  extracted_text: string;
  detected_amounts: number[];
  total_amount: number;
  notes: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8000/api/expenses/records/';

  constructor(private http: HttpClient) { }

  getExpenseRecords(): Observable<ExpenseRecord[]> {
    return this.http.get<ExpenseRecord[]>(this.apiUrl);
  }

  createExpenseRecord(record: ExpenseRecord): Observable<ExpenseRecord> {
    return this.http.post<ExpenseRecord>(this.apiUrl, record);
  }
}
