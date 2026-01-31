import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { appSignalStore } from '../data/signal-store';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticker-dropdown',
  imports: [MatFormFieldModule, MatSelectModule, MatRadioModule, FormsModule],
  template: `
  <div class="flex flex-row justify-end">
    <div class="flex flex-row justify-end mr-4">
      <mat-radio-group aria-label="Select the Time Span" (ngModel)="store.timeSpanMonths()" (change)="onChangeTimeSpan($event)">
        <mat-radio-button value="1">1 month</mat-radio-button>
        <mat-radio-button value="6">6 months</mat-radio-button>
        <mat-radio-button value="12">12 months</mat-radio-button>
      </mat-radio-group>
    </div>
    <mat-form-field appearance="fill" >
      <mat-label>Símbolo o Ticker</mat-label>
      <mat-select (valueChange)="onChangeTicker($event)">
        @for (ticker of tickerListSignal(); track ticker) {
          <mat-option [value]="ticker">{{ ticker }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  </div>
  `,
  styles: ``,
})
export class TickerDropdown {
  store = inject(appSignalStore);
  
  tickerListSignal = signal<string[]>(['otro...', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'ORCL', 'NVDA', 'IBM', 'INTC']);

  onChangeTimeSpan(event: any) {
    const months = parseInt(event.value, 10);
    this.store.setTimeSpan(months)
  }

  onChangeTicker(newTicker: string) {
    const ticker = newTicker;
    this.store.setTicker(ticker)
  }
}
