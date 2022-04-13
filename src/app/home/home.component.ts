import { Component, OnInit } from '@angular/core';
import { environment as Environment } from 'src/environments/environment';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  //Global variables
  applicationName: string = Environment.applicationName;
  fakeUserName: string = "Franciele";
  welcomeTitle: string = `Welcome back ${this.fakeUserName}`;
  customerName: string = "Beilke Industries";
  productVersion: string = "Beta 1";

  ngOnInit (): void {

  }

}