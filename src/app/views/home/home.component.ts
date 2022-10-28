import { Component, OnInit, ViewChild } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private snackBar: MatSnackBar,
    private userAccessService: UserAccessService
  ) { }

  public applicationName: string = environment.applicationName;
  public fakeUserName: string = "Franciele";
  public welcomeTitle: string = `Bem vindo de volta ${this.fakeUserName}`;
  public customerName: string = "Beilke Industries";
  public productVersion: string = "Beta 1";
  public step = 0;
  public uiColor = ui.color;
  public panels: any = [
    // {
    //   name: 'Tarefas',
    //   description: 'Suas tarefas a fazer e já concluídas',
    //   icon: 'task_alt',
    //   tasks: [
    //     {
    //       title: 'teste 1',
    //       description: 'Teste',
    //       done: false,
    //       date: new Date(2022, 4, 30, 17, 50, 0)
    //     },
    //     {
    //       title: 'teste 2',
    //       description: 'teste',
    //       done: true,
    //       date: new Date(2022, 4, 30, 17, 50, 0)
    //     }
    //   ]
    // },
    // {
    //   name: 'Contas',
    //   description: 'Contas a pagar e pagas',
    //   icon: 'money',
    //   tasks: [
    //     {
    //       title: 'teste 1',
    //       description: 'Teste',
    //       done: false,
    //       date: new Date(2022, 4, 30, 17, 50, 0)
    //     },
    //     {
    //       title: 'teste 2',
    //       description: 'teste',
    //       done: true,
    //       date: new Date(2022, 4, 30, 17, 50, 0)
    //     }
    //   ]
    // }
  ];

  ngOnInit (): void {
    this.checkNotifications();
  }

  checkNotifications () {
    try {
      this.panels.push(
        {
          name: 'Contas vencidas',
          description: 'Próximas contas à vencer',
          icon: 'notification_important',
          tasks: this.userAccessService.user.notifications
        },
      );
    }
    catch (error) {
      if (environment.logInfo) console.log('erro ao consultar notificações: ', error);
      this.showNotification(error.message, 'Erro');
    }
  }

  payBillOverdue (bill: any) {
    if (bill.id) {

    }
    else this.showNotification('', 'Erro');
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
  showNotification (message: string, action: string, duration = 2000) {
    this.snackBar.open(message, action, { duration: duration })
  }

}