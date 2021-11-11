import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from "../app/helpers/auth.guard";
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import {ContactsComponent} from './contacts/contacts.component'
import {SalesOrderComponent} from './sales-order/sales-order.component'
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'contacts',component:ContactsComponent},
  {path:'sales-order',component:SalesOrderComponent},
  { path: 'user', component: UserComponent },
  {path:'dashboard',component:DashboardComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
