import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import { ContactComponent } from './contact/contact.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCreateComponent } from './crud-contact/dialog-create/dialog-create.component';
import { DialogEditComponent } from './crud-contact/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from './crud-contact/dialog-delete/dialog-delete.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { DialogCreateSalesorderComponent } from './crud-salesorder/dialog-create-salesorder/dialog-create-salesorder.component';
import { DialogEditSalesorderComponent } from './crud-salesorder/dialog-edit-salesorder/dialog-edit-salesorder.component';
import { DialogDeleteSalesorderComponent } from './crud-salesorder/dialog-delete-salesorder/dialog-delete-salesorder.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DialogCreateUsermanagementComponent } from './crud-usermanagement/dialog-create-usermanagement/dialog-create-usermanagement.component';
import { DialogEditUsermanagementComponent } from './crud-usermanagement/dialog-edit-usermanagement/dialog-edit-usermanagement.component';
import { DialogDeleteUsermanagementComponent } from './crud-usermanagement/dialog-delete-usermanagement/dialog-delete-usermanagement.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NzTableModule} from "ng-zorro-antd/table"
import {NzDividerModule } from 'ng-zorro-antd/divider';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    UserManagementComponent,
    DialogCreateComponent,
    DialogEditComponent,
    DialogDeleteComponent,
    SalesOrderComponent,
    DialogCreateSalesorderComponent,
    DialogEditSalesorderComponent,
    DialogDeleteSalesorderComponent,
    UserManagementComponent,
    DialogCreateUsermanagementComponent,
    DialogEditUsermanagementComponent,
    DialogDeleteUsermanagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NzTableModule,
    NzDividerModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
