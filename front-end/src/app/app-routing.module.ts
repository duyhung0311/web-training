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
import { HomeComponent } from './home/home.component';
import {RouteGuardService} from '../services/route-guard.service'
import { RoleGuardService } from '../services/role-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RouteGuardService],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'password', component: PasswordComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'sales-order', component: SalesOrderComponent },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [RoleGuardService],
        // data: {
        //   guards: [],
        //     guardsRelation: 'OR',
        //     fallbackUrl: '/dashboard',
        // },
      },
      { path: 'dashboard', component: DashboardComponent },
    ],
    data: {
      guards: [],
      guardsRelation: 'OR',
      fallbackUrl: '/login',
    },
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
