import { Component, OnInit, ViewChild } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';
import { DialogReport } from 'src/app/util/error-dialog-report';
import { FinancialModel } from 'src/app/models/financial.model';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private snackBar: MatSnackBar,
    private userAccessService: UserAccessService,
    private dialogReport: DialogReport,
    private billsService: BillsService
  ) { }

  public applicationName: string = environment.applicationName;
  public step = 0;
  public uiColor = ui.color;
  public panels: any = [];

  ngOnInit (): void {
    this.checkNotifications();
  }

  checkNotifications () {
    try {
      this.panels.push(
        {
          name: 'Contas à vencer',
          description: 'Próximos vencimentos',
          icon: 'notification_important',
          tasks: this.userAccessService.user.notifications,
          class: 'bills-close-to-overdue'
        },
      );
    }
    catch (error) {
      if (environment.logInfo) console.log('erro ao consultar notificações: ', error);
      this.dialogReport.showMessageDialog(error, true, true);
    }
  }

  payBillOverdue (bill: any) {
    if (bill.id && confirm("Deseja atualizar a conta como paga?")) {
      this.billsService.payBillOverdue(bill.id).subscribe(
        resp => { this.showNotification('Sucesso ao atualizar a conta'); },
        error => { this.dialogReport.showMessageDialog(error, true, true); }
      );
    }
    else {
      bill.done = false;
      return;
    }
  }

  setStep (index: number) {
    this.step = index;
  }

  nextStep () {
    this.step++;
  }

  prevStep () {
    this.step--;
  }

  /**
   * Show a notification in the main page
   * @param message Message to display
   * @param action Origin event
   * @param duration Integer containing the value to animation time
   */
  showNotification (message: string, action: string = '', duration = 2000) {
    this.snackBar.open(message, action, { duration: duration })
  }

}