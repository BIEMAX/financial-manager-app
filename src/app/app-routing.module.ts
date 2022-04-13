import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Project packages
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';

//Router to access through angular
const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }