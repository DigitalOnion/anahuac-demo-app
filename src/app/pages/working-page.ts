import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-working-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CanvasJSAngularChartsModule],
  template: `
    <div class="max-w-[1200px] mx-auto w-full h-full bg-transparent">
      <canvasjs-chart
        [options]="chartOptions"
        [styles]="{ width: '100%', height: '60%' }"
        (chartInstance)="getChartInstance($event)"
      />
    </div>
  `,
  styles: ``,
})
export class WorkingPage implements AfterViewInit {
  dataPoints: any = [];
  chart: any;

  constructor(private http: HttpClient) {}

  chartOptions = {
    theme: 'light2',
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text: 'Bitcoin Closing Price',
    },
    subtitles: [
      {
        text: 'Loading Data...',
        fontSize: 16,
        horizontalAlign: 'center',
        verticalAlign: 'center',
        dockInsidePlotArea: true,
      },
    ],
    axisY: {
      title: 'Closing Price (in USD)',
      prefix: '',
    },
    data: [
      {
        type: 'line',
        name: 'Closing Price',
        yValueFormatString: '$#,###.00',
        xValueType: 'dateTime',
        dataPoints: this.dataPoints,
      },
    ],
  };

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  ngAfterViewInit() {
    this.http
      .get('https://canvasjs.com/data/gallery/angular/btcusd2021.json', { responseType: 'json' })
      .subscribe((response: any) => {
        let data = response;
        for (let i = 0; i < data.length; i++) {
          this.dataPoints.push({ x: new Date(data[i].date), y: Number(data[i].close) });
        }
        this.chart.subtitles[0].remove();
      });
  }
}
