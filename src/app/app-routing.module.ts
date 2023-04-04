import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './views/generic/page-not-found/page-not-found.component';

//Project packages
import { HomeComponent } from './views/home/home.component';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { UserHasAccess } from './services/user-access-permissions';

import { FinancialsListComponent } from './views/financial-manager/financials-list/financials-list.component';
import { FinancialsReportComponent } from './views/financial-manager/financials-report/financials-report.component';
import { ReleaseNotesComponent } from './views/generic/release-notes/release-notes.component';
import { FinancialsTagsComponent } from './views/financial-manager/financials-tags/financials-tags.component';
import { FinancialsDefaultersComponent } from './views/financial-manager/financials-defaulters/financials-defaulters.component';

// Pre-sale
import { PresellComponent } from './views/presell/presell.component'
import { ProstadineComponent } from './views/presell/prostadine/prostadine.component'
import { AlpileanComponent } from './views/presell/alpilean/alpilean.component'
import { ProstadineFrComponent } from './views/presell/prosta-fr/prostadine.component'

//Router to access through angular
const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  //Financials manager
  {
    path: 'financials',
    component: FinancialsListComponent
  },
  {
    path: 'reports',
    component: FinancialsReportComponent
  },
  {
    path: 'tags',
    component: FinancialsTagsComponent
  },
  {
    path: 'defaulters',
    component: FinancialsDefaultersComponent
  },
  //Generics
  {
    path: 'whatsnew',
    component: ReleaseNotesComponent
  },
  {
    path: 'presell',
    component: PresellComponent,
    children: [
      {
        path: 'prostadine',
        component: ProstadineComponent
      },
      {
        path: 'alpilean',
        component: AlpileanComponent
      },
      {
        path: 'prostadine-fr',
        component: ProstadineFrComponent
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
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }