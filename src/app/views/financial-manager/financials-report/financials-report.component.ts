import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { GenericFunctions } from 'src/app/util/generic-functions';

import { ui } from 'src/environments/environment';
import { ChartsService } from 'src/app/services/chart.service';
import { DialogReport } from 'src/app/util/error-dialog-report';

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

  /**
   * Global options
   */
  private globalOptions: ChartOptions<'doughnut'> = {
    responsive: false,
    plugins: {
      title: {
        display: false,
      }
    }
  };
  private globalPlugins: {
    legend: {
      onHover: 'handleHover',
      onLeave: 'handleLeave'
    },
    title: {
      display: false,
    }
  };
  private globalBackgroundColors = [
    // 'rgba(255, 99, 132, 0.2)',
    // 'rgba(54, 162, 235, 0.2)',
    // 'rgba(255, 206, 86, 0.2)',
    // 'rgba(75, 192, 192, 0.2)',
    // 'rgba(153, 102, 255, 0.2)',
    // 'rgba(255, 159, 64, 0.2)'
  ];

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public listCharts: any = [];
  public hasToWait: Boolean = false;
  public dateToSelect: any = new FormControl(moment());
  public gridColumnsToShow: Number = 2;
  /**
   * Contains a list of available charts to user select
   */
  public availableChartTypes = [
    'pie',
    'doughnut',
    'bar'
  ];

  private currentMonth: number = new Date().getMonth() + 1;
  private currentYear: number = new Date().getFullYear();

  @ViewChild('chart', { static: false }) chart: Chart;

  constructor(
    private chartsService: ChartsService,
    private genericFunctions: GenericFunctions,
    private dialogReport: DialogReport,
  ) { }

  ngOnInit () {
    this.getUserCharts();
  }

  getUserCharts () {
    this.chartsService.getAvailableChartByUser().subscribe(
      response => {
        let charts: any = response;

        if (charts.data[0] != undefined && charts.data[0].charts.length > 0) {
          this.listCharts = charts.data[0].charts.filter(c => c.hasAccess == true);
          this.updateChartData(this.currentMonth, this.currentYear);
        } else this.genericFunctions.showNotification("Não há relatórios disponíveis para seu usuário");
      },
      error => {
        this.hasToWait = false;
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  getBillsByMonth (chart: any, month: number, year: number) {
    this.chartsService.getSumBillsByMonthAndYear(month, year).subscribe(
      response => {
        let data: any = response;

        chart.type = 'doughnut';
        chart.dataset = [{
          data: data.data.data.map(c => c.total_value).sort((x, y) => Number(y) - Number(x)), //Ordena os verdadeiros primeiro
          //backgroundColor: this.globalBackgroundColors
        }];
        chart.labels = [data.data.labels[0], data.data.labels[1]];
        chart.options = this.globalOptions;
        chart.plugins = this.globalPlugins;
        chart.legend = true;

        return chart;
      },
      error => { }
    );
  }

  getBillsByYear (chart: any, year: number) {
    this.chartsService.getSumBillsByYear(year).subscribe(
      response => {
        let data: any = response;
        chart.type = 'pie';
        chart.dataset = [{
          data: data.data.data.map(c => c.total_value).sort((x, y) => Number(y) - Number(x)), //Ordena os verdadeiros primeiro
          //backgroundColor: this.globalBackgroundColors
        }];
        chart.labels = [data.data.labels[0], data.data.labels[1]];
        chart.options = this.globalOptions;
        chart.plugins = this.globalPlugins;
        chart.legend = true;

        return chart;
      },
      error => { }
    );
  }

  getBillsSpendByMonth (chart: any, month: number, year: number) {
    this.chartsService.getMoneySpentByMonth(month, year).subscribe(
      response => {
        let data: any = response;

        var spendData = data.data.data;

        let dataSet = spendData.map((c: { value: any; }) => c.value);
        let labels = spendData.map((c: { name: any; }) => [c.name]);

        chart.type = 'doughnut';
        chart.dataset = [{
          data: dataSet,
          ////backgroundColor: this.globalBackgroundColors
        }];
        chart.labels = labels;
        chart.options = this.globalOptions;
        chart.legend = true;

        return chart;
      },
      error => { }
    );
  }

  getReceiptsAndExpensesByMonth (chart: any, month: number, year: number) {
    this.chartsService.getMoneyRemainByMonth(month, year).subscribe(
      response => {
        let data: any = response;

        var receivedData = data.data;

        let dataSet = [receivedData.data.entriesValues, receivedData.data.exitsValues, receivedData.data.remainValues];
        let labels = receivedData.labels.map((c) => [c]);

        chart.type = 'doughnut';
        chart.dataset = [{
          data: dataSet,
          //backgroundColor: this.globalBackgroundColors
        }];
        chart.labels = labels;
        chart.options = this.globalOptions;
        chart.plugins = this.globalPlugins;
        chart.legend = true;

        return chart;
      },
      error => { }
    );
  }

  setMonthAndYear (normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>, reportNumber: any) {

    const ctrlValue = this.dateToSelect.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateToSelect.setValue(ctrlValue);
    datepicker.close();

    this.updateChartData(normalizedMonthAndYear.month() + 1, normalizedMonthAndYear.year(), reportNumber);
  }

  /**
   * Update specific chart after month changed by the user
   * @param month 
   * @param year 
   * @param reportNumber 
   */
  updateChartData (month: number, year: number, reportNumber?: number) {
    this.listCharts.map((chart) => {

      chart.date = new FormControl(moment());

      //The vigente comes from database (first opening)
      if (chart.reportName.toLowerCase().includes("vigente") && !chart.reportName.toLowerCase().includes("anuais")) {
        chart.reportName = chart.reportName.replace("vigente", `${month}/${year}`);
      }
      else if (!chart.reportName.toLowerCase().includes("anuais")) {
        let monthToReplace = chart.reportName.substring(chart.reportName.lastIndexOf(" "), chart.reportName.length);
        chart.reportName = chart.reportName.replace(monthToReplace, ` ${month}/${year}`);
      }

      switch (chart.reportNumber) { //Loading screen, load all reports
        case 1: chart = this.getBillsByMonth(chart, month, year); break;
        case 2: chart = this.getBillsByYear(chart, year); break;
        case 3: chart = this.getBillsSpendByMonth(chart, month, year); break;
        case 4: chart = this.getReceiptsAndExpensesByMonth(chart, month, year); break;
        default: break;
      }

      this.genericFunctions.showNotification(`Sucesso ao ${reportNumber ? 'atualizar' : 'consultar'} os relatórios`);
    });
  }

  toggleGridColumns () {
    this.gridColumnsToShow = this.gridColumnsToShow === 2 ? 4 : 2;
  }

  /**
   * Function to change chart type based on user selection
   * @param chart 
   * @param newType 
   * @returns 
   */
  changeChartType (chart: any, newType: string) {
    if (this.chart) this.chart.destroy();
    if (typeof (newType) != "undefined" && newType) { //User can just click above control
      chart.type = newType;
      return chart;
    }
  }

}
