import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ui } from 'src/environments/environment';
import { ChartsService } from 'src/app/services/chart.service';
import { ResponseStatus } from 'src/app/util/response-status-message';

@Component({
  selector: 'app-financials-report',
  templateUrl: './financials-report.component.html',
  styleUrls: ['./financials-report.component.css']
})
export class FinancialsReportComponent implements OnInit {

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

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public listCharts: [];
  public hasToWait: Boolean = false;


  constructor(
    private chartsService: ChartsService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit () {
    this.getUserCharts();
  }

  getUserCharts () {
    this.chartsService.getCharts().subscribe(
      response => {
        let charts: any = response;

        if (charts.data[0] != undefined && charts.data[0].charts.length > 0) {
          this.listCharts = charts.data[0].charts.filter(c => c.hasAccess == true)
          this.showNotification("Sucesso ao consultar os relatórios", "");
        } else {

        }
      },
      error => {
        this.hasToWait = false;
        this.showNotification(ResponseStatus((error.error.message)), 'Erro');
      }
    );
  }

  /**
   * Show a notification in the main page
   * @param message Message to display
   * @param action Origin event
   * @param duration Integer containing the value to animation time
   */
  showNotification (message: string, action: string, duration = 2000) {
    this.snackBar.open(message, action, { duration: duration })
  }

}
