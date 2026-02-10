import { Injectable } from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  constructor() { }

  async processImage(file: File): Promise<{ text: string, confidence: number }> {
    const result = await Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m)
    });

    return {
      text: result.data.text,
      confidence: result.data.confidence
    };
  }

  extractNumbers(text: string): number[] {
    const numberPattern = /\d+\.?\d*/g;
    const matches = text.match(numberPattern);

    if (!matches) return [];

    return matches
      .map(match => parseFloat(match))
      .filter(num => !isNaN(num) && num > 0);
  }

  calculateTotal(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
}
