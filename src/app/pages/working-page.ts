import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { appSignalStore, DataPointType } from '../data/signal-store';

@Component({
  selector: 'app-working-page',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, MatFormFieldModule, MatSelectModule],
  template: `
    <div class="max-w-[1200px] mx-auto w-full h-full bg-transparent">
      @if (store.ticker() && store.status()=="ok") {
        <canvasjs-chart
          [options]="getChartOptions(this.store.ticker(), store.dataset())"
          [styles]="{ width: '100%', height: '60%' }"
          (chartInstance)="getChartInstance($event)"
        />
      } @else if (store.ticker()) {
        <p>&nbsp;</p>
      } @else if (store.status()=='error') {
        <p>Error al descargar los datos para la grafica.</p>
      } 
    </div>
  `,
  styles: ``,
})
export class WorkingPage {

  store = inject(appSignalStore)

  getChartInstance(chart: object) {
    this.store.setChartObject(chart);
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
