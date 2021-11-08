import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './menu/menu.component'
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {MatRadioModule} from '@angular/material/radio'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from './../app/ng-zorro-antd.module';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/services/authconfig.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { MatSelectModule } from '@angular/material/select';
import { PasswordComponent } from './password/password.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';


registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LayoutComponent,
    UserComponent,
    LoginComponent,
    ProfileComponent,
    PasswordComponent,
    ContactsComponent,
    SalesOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    MatSelectModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
