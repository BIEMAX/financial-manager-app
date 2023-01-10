import { Component, OnInit, ViewChild } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { MatAccordion } from '@angular/material/expansion';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';
import { DialogReport } from 'src/app/util/error-dialog-report';
import { BillsService } from 'src/app/services/bills.service';
import { GenericFunctions } from 'src/app/util/generic-functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  public applicationName: string = environment.applicationName;
  public step = 0;
  public uiColor = ui.color;
  public panels: any = [];
  /**
   * Define true to show waiting progress spinner on front.
   */
  public hasToWait: boolean = false;

  constructor(
    private userAccessService: UserAccessService,
    private dialogReport: DialogReport,
    private billsService: BillsService,
    private genericFunctions: GenericFunctions
  ) { }

  ngOnInit (): void {
    this.startPanels();
  }

  /**
   * Create the initial panels for user checking
   */
  startPanels () {
    this.hasToWait = true;
    try {
      this.panels.push(
        {
          name: 'Contas à vencer',
          description: 'Próximos vencimentos',
          icon: 'notification_important',
          tasks: '',
          class: 'bills-close-to-overdue'
        },
        {
          name: 'Contas vencidas',
          description: 'Contas atrasadas',
          icon: 'assignment_late',
          tasks: '',
          class: 'bills-overdue'
        }
      );
      this.getBillsCloseToOverdue();
    }
    catch (error) {
      this.hasToWait = false;
      if (environment.logInfo) console.log('Erro ao inicial paineis: ', error);
      this.dialogReport.showMessageDialog(error, true, true);
    }
  }

  /**
   * Get the bills that will overdue or already overdue.
   */
  getBillsCloseToOverdue () {
    this.billsService.getBillsCloseToOverdue().subscribe(
      response => {
        let resp: any = response;

        this.panels[0].tasks = resp.data.map((b) => {
          return {
            id: b.id,
            name: b.name,
            title: `Conta '${b.name}' está próxima do seu vencimento`,
            description: b.description || 'Efetue o pagamento da mesma e evite juros.',
            done: false,
            date: b.dueDate
          };
        });

        this.getBillsOverdue();
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log('erro ao consultar próximas do vencimento: ', error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  /**
   * Get the bills already overdue (all bills in history)
   */
  getBillsOverdue () {
    this.billsService.getBillByPayed(false).subscribe(
      response => {
        let resp: any = response;

        this.panels[1].tasks = resp.data.map((b) => {
          return {
            id: b.id,
            name: b.name,
            title: `Conta '${b.name}' não foi paga e se encontra atrasada`,
            description: b.description || 'Pague a conta para evitar o aumento dos juros.',
            done: false,
            date: b.dueDate
          };
        });

        this.userAccessService.user.notifications = this.panels[1].tasks.length;
        this.hasToWait = false;
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log('erro ao consultar contas vencidas: ', error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  payBillOverdue (bill: any) {
    if (bill.id && confirm("Deseja atualizar a conta como paga?")) {
      this.billsService.payBillOverdue(bill.id).subscribe(
        resp => { this.genericFunctions.showNotification('Sucesso ao atualizar a conta'); },
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

}