import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';

import { ui } from 'src/environments/environment';
import { ChartsService } from 'src/app/services/chart.service';
import { ResponseStatus } from 'src/app/util/response-status-message';

// tslint:disable-next-line:no-duplicate-imports
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-financials-report',
  templateUrl: './financials-report.component.html',
  styleUrls: ['./financials-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS, useValue:
      {
        parse: {
          dateInput: 'MM/YYYY',
        },
        display: {
          dateInput: 'MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
  ],
})
export class FinancialsReportComponent implements OnInit {

  // Pie
  private genericOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public listCharts: any = [];
  public hasToWait: Boolean = false;
  public datePicked: any;
  public date = new FormControl(moment());

  private currentMonth: number = new Date().getMonth() + 1;
  private currentYear: number = new Date().getFullYear();

  constructor(
    private chartsService: ChartsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit () {
    this.getUserCharts();
  }

  getUserCharts () {
    this.chartsService.getChartsList().subscribe(
      response => {
        let charts: any = response;

        if (charts.data[0] != undefined && charts.data[0].charts.length > 0) {
          this.listCharts = charts.data[0].charts.filter(c => c.hasAccess == true)
          this.listCharts.map((chart) => {
            if (chart.hasAccess) {
              switch (chart.reportNumber) {
                case 1: chart = this.getBillsByMonth(chart); break;
                case 2: this.getBillsByYear(chart); break;
                case 3: this.getBillsSpendByMonth(chart); break;
                default: break;
              }

              this.showNotification("Sucesso ao consultar os relatórios", "");
            }
          });
        } else {
          this.showNotification("Não há relatórios disponíveis para seu usuário", "");
        }
      },
      error => {
        this.hasToWait = false;
        this.showNotification(ResponseStatus((error.error.message)), 'Erro');
      }
    );
  }

  getBillsByMonth (chart: any) {
    this.chartsService.getBillsByMonth(this.currentMonth, this.currentYear).subscribe(
      response => {
        let data: any = response;

        chart.type = 'pie';
        chart.dataset = [{ data: data.data.data.map(c => c.total_value).sort((x, y) => Number(y) - Number(x)) }]; //Ordena os verdadeiros primeiro
        chart.labels = [data.data.labels[0], data.data.labels[1]];
        chart.options = this.genericOptions;
        chart.plugins = [];
        chart.legend = true;

        return chart;
      },
      error => { }
    );
  }

  getBillsByYear (chart: any) {
    this.chartsService.getBillsByYear(this.currentYear).subscribe(
      response => {
        let data: any = response;
        chart.type = 'pie';
        chart.dataset = [{ data: data.data.data.map(c => c.total_value).sort((x, y) => Number(y) - Number(x)) }]; //Ordena os verdadeiros primeiro
        chart.labels = [data.data.labels[0], data.data.labels[1]];
        chart.options = this.genericOptions;
        chart.plugins = [];
        chart.legend = true;

        return chart;
      },
      error => { }
    );
  }

  getBillsSpendByMonth (chart: any) {
    this.chartsService.getBillsOutgoingByMonth(this.currentMonth, this.currentYear).subscribe(
      response => {
        let data: any = response;

        var outgoingData = data.data.data;

        let dataSet = outgoingData.map((c: { value: any; }) => c.value);
        let labels = outgoingData.map((c: { name: any; }) => [c.name]);

        chart.type = 'pie';
        chart.dataset = [{ data: dataSet }]; //Ordena os verdadeiros primeiro
        chart.labels = labels;
        chart.options = this.genericOptions;
        chart.legend = true;

        return chart;
      },
      error => { }
    );
  }

  setMonthAndYear (normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
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
