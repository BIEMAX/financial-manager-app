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

//Router to access through angular
const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserHasAccess]
  },
  //Financials manager
  {
    path: 'financials',
    component: FinancialsListComponent,
    //canActivate: [UserHasAccess]
  },
  {
    path: 'reports',
    component: FinancialsReportComponent,
    canActivate: [UserHasAccess]
  },
  {
    path: 'tags',
    component: FinancialsTagsComponent,
    canActivate: [UserHasAccess]
  },
  {
    path: 'defaulters',
    component: FinancialsDefaultersComponent,
    canActivate: [UserHasAccess]
  },
  //Generics
  {
    path: 'whatsnew',
    component: ReleaseNotesComponent
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