import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DataPointType, tickerSignal } from '../data/signal-store';
import { datasetSubject } from '../data/signal-store';
import { FinancialDataService } from '../model/financial-data.service';

@Component({
  selector: 'app-ticker-dropdown',
  imports: [MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field>
      <mat-label>Símbolo o Ticker</mat-label>
      <mat-select (valueChange)="onChangeTicker($event)">
        @for (ticker of tickerListSignal(); track ticker) {
          <mat-option [value]="ticker">{{ ticker }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: ``,
})
export class TickerDropdown {
  tickerListSignal = signal<string[]>(['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'ORCL', 'NVDA', 'IBM', 'INTC']);
  financialDataService = inject(FinancialDataService);

  onChangeTicker(newTicker: string) {
    tickerSignal.set(newTicker);
    this.financialDataService.getDataSetPromise(tickerSignal(), new Date('2025-11-01'), new Date('2025-12-01'))
    .then((dataPoints: DataPointType[]) => {
      datasetSubject.next(dataPoints);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

}
