import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FinancialDataService } from '../model/financial-data.service';
import { DataPointType } from '../data/signal-store';

import { tickerSignal } from '../data/signal-store';
import { datasetSubject } from '../data/signal-store';


@Component({
  selector: 'app-working-page',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, MatFormFieldModule, MatSelectModule],
  template: `
    <div class="max-w-[1200px] mx-auto w-full h-full bg-transparent">
      @if (tickerSignalLocal()) {
        <canvasjs-chart
          [options]="getChartOptions(tickerSignalLocal(), dataPoints)"
          [styles]="{ width: '100%', height: '60%' }"
          (chartInstance)="getChartInstance($event)"
        />
      }
    </div>
  `,
  styles: ``,
})
export class WorkingPage {
  dataPoints: any = [];
  chart: any;
  tickerSignalLocal = tickerSignal

  financialDataService = inject(FinancialDataService);

  datasetSubscription = datasetSubject.subscribe((dataPoints: DataPointType[]) => {
    this.dataPoints = dataPoints;
    this.chart.options.data[0].dataPoints = this.dataPoints;
    this.chart.subtitles[0].remove();
    this.chart.render();
  });

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  getChartOptions(ticker: string, dataPoints: DataPointType[]) {
    return {
      theme: 'light2',
      zoomEnabled: true,
      exportEnabled: false,
      title: {
        text: `${ticker} Closing Price`,
      },
      subtitles: [
        {
          text: 'Loading Data...',
          fontSize: 18,
          horizontalAlign: 'center',
          verticalAlign: 'center',
          dockInsidePlotArea: true,
        },
      ],
      axisY: {
        title: 'Closing Price (in USD)',
      },
      data: [
        {
          type: 'line',
          name: 'Closing Price',
          yValueFormatString: '$#,###.00',
          xValueType: 'dateTime',
          dataPoints: dataPoints,
        },
      ],
    };
  }
}
