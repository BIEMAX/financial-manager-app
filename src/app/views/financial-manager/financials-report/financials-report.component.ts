import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-financials-report',
  templateUrl: './financials-report.component.html',
  styleUrls: ['./financials-report.component.css']
})
export class FinancialsReportComponent {

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Entradas'], ['Saídas']];
  public pieChartDatasets = [{
    data: [11500.15, 4547.69]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

}
