import { Component, OnInit, ViewChild } from '@angular/core';
import { environment as Environment } from 'src/environments/environment';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() { }

  //Global variables
  applicationName: string = Environment.applicationName;
  fakeUserName: string = "Franciele";
  welcomeTitle: string = `Welcome back ${this.fakeUserName}`;
  customerName: string = "Beilke Industries";
  productVersion: string = "Beta 1";
  step = 0;

  //Datasources for testings
  panelsDataSource: any = [
    {
      name: 'Notifications',
      description: 'Your notifications',
      icon: 'notifications',
      tasks: [
        {
          title: 'Ir ao mercado',
          description: 'Teste',
          done: false,
          date: new Date(2022, 4, 30, 17, 50, 0)
        },
        {
          title: 'Ligar para o dionei',
          description: 'Mozão',
          done: true,
          date: new Date(2022, 4, 30, 17, 50, 0)
        }
      ]
    },
    {
      name: 'Tasks',
      description: 'Your tasks (done and to do)',
      icon: 'task_alt',
      tasks: [
        {
          title: 'teste 1',
          description: 'Teste',
          done: false,
          date: new Date(2022, 4, 30, 17, 50, 0)
        },
        {
          title: 'teste 2',
          description: 'teste',
          done: true,
          date: new Date(2022, 4, 30, 17, 50, 0)
        }
      ]
    },
    {
      name: 'Bill',
      description: 'Billings to pay',
      icon: 'money',
      tasks: [
        {
          title: 'teste 1',
          description: 'Teste',
          done: false,
          date: new Date(2022, 4, 30, 17, 50, 0)
        },
        {
          title: 'teste 2',
          description: 'teste',
          done: true,
          date: new Date(2022, 4, 30, 17, 50, 0)
        }
      ]
    }
  ]

  ngOnInit (): void {

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