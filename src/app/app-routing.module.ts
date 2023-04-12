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

// Pre-sale Luis
import { PresellComponent } from './views/presell/presell.component'
import { ProstadineComponent } from './views/presell/prostadine/prostadine.component'
import { SynogutComponent } from './views/presell/luis/synogut/synogut.component'
import { ProsperComponent } from './views/presell/luis/prosper/prosper.component'
import { MaasalongComponent } from './views/presell/luis/maasalong/maasalong.component'
import { AlpiluisComponent } from './views/presell/luis/alpilean/alpi-luis.component'
import { GlucofortluiComponent } from './views/presell/luis/glucofort/glucofort.component'
import { FolifortluiComponent } from './views/presell/luis/folifort/folifort.component'
import { GlucoswiluiComponent } from './views/presell/luis/gluco-switch/gluco-switch.component'
import { ProdentimLuisComponent } from './views/presell/luis/prodentim/pro-luis.component'

// Pre-sale Franciele
import { AlpileanComponent } from './views/presell/fran/alpilean/alpilean.component'
import { ProstadineFrComponent } from './views/presell/fran/prosta-fr/prostadine.component'
import { GlucofortComponent } from './views/presell/fran/glucofort/glucofort.component'
import { GlucoberryComponent } from './views/presell/fran/glucoberry/glucoberry.component'
import { IkariaJuiceComponent } from './views/presell/fran/ikaria-juice/ikaria-juice.component'
import { CortexiComponent } from './views/presell/fran/cortexi/cortexi.component'
import { ProdentimFrComponent } from './views/presell/fran/prodentim/pro-fr.component'

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
      //Luis
      {
        path: 'prostadine',
        component: ProstadineComponent
      },
      {
        path: 'synogut',
        component: SynogutComponent
      },
      {
        path: 'prosper',
        component: ProsperComponent
      },
      {
        path: 'massalong',
        component: MaasalongComponent
      },
      {
        path: 'apraffluipat',
        component: AlpiluisComponent
      },
      {
        path: 'gluco-ls',
        component: GlucofortluiComponent
      },
      {
        path: 'foli-ls',
        component: FolifortluiComponent
      },
      {
        path: 'swit-ls',
        component: GlucoswiluiComponent
      },
      {
        path: 'pro-ls',
        component: ProdentimLuisComponent
      },
      // Franciele
      {
        path: 'aprafffr',
        component: AlpileanComponent
      },
      {
        path: 'prostadine-fr',
        component: ProstadineFrComponent
      },
      {
        path: 'gluco-fr',
        component: GlucofortComponent
      },
      {
        path: 'glucobr-fr',
        component: GlucoberryComponent
      },
      {
        path: 'juice',
        component: IkariaJuiceComponent
      },
      {
        path: 'cortexi',
        component: CortexiComponent
      },
      {
        path: 'pro-fr',
        component: ProdentimFrComponent
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