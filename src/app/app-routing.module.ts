import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialsListComponent } from './views/financial-manager/financials-list/financials-list.component';
import { FinancialsNewComponent } from './views/financial-manager/financials-new/financials-new.component';
import { PageNotFoundComponent } from './views/generic/page-not-found/page-not-found.component';

//Project packages
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

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