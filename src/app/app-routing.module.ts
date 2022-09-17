import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialsListComponent } from './views/financial-manager/financials-list/financials-list.component';
import { CustomDialogComponent } from './views/generic/dialog/custom-dialog.component';
import { PageNotFoundComponent } from './views/generic/page-not-found/page-not-found.component';

//Project packages
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UserHasAccess } from './services/user-access-permissions';

//Router to access through angular
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserHasAccess],
  },
  //Financials manager
  {
    path: 'financials',
    component: FinancialsListComponent,
    canActivate: [UserHasAccess],
    // children: [
    //   {
    //     path: 'new',
    //     component: FinancialsNewComponent
    //   }
    // ]
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