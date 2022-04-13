import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialsListComponent } from './financial-manager/financials-list/financials-list.component';
import { FinancialsNewComponent } from './financial-manager/financials-new/financials-new.component';
import { PageNotFoundComponent } from './generic/page-not-found/page-not-found.component';

//Project packages
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

//Router to access through angular
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  //Financials manager
  {
    path: 'financials',
    component: FinancialsListComponent,
    children: [
      {
        path: 'new',
        component: FinancialsNewComponent
      }
    ]
  },

  //Templates
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }