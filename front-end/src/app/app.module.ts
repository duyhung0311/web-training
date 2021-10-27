import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInput,MatInputModule} from '@angular/material/input'
import {MatFormFieldModule,MatFormField} from '@angular/material/form-field'
import {MatIcon,MatIconModule} from '@angular/material/icon'
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    DialogCreateComponent,
    DialogEditComponent,
    DialogDeleteComponent,
    SalesOrderComponent,
    DialogCreateSalesorderComponent,
    DialogEditSalesorderComponent,
    DialogDeleteSalesorderComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
