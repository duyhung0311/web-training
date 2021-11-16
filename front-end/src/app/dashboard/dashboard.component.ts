import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/services/auth.service';
import { ContactsService } from 'src/services/contacts.service';
import { Contacts } from 'src/model/contact-dashboard';
import { SalesOrderService } from 'src/services/sales-order.service';
import { SalesOrder } from 'src/model/sales-dashboard';
import { CommnunicatetionService } from 'src/services/commnunicatetion.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  contactArr: any[] = [];
  arrCompare: Contacts[] = [];
  arrCompare1: Boolean;
  arrCompare2: SalesOrder;
  arrCompareNext: SalesOrder[] = [];
  salesOrderArr: any[] = [];
  objectDemo: any[] = [];
  objectDemo1: any[] = [];
  objectDemoNext: any[] = [];
  arrAfterClicked: any[] = [];
  arr: any[] = [];
  leadSrc: any;
  user = {
    name: '',
    username: '',
    email: '',
    phone: '',
    isAdmin: '',
    isActive: '',
  };
  variable: any;
  status: SalesOrder;
  assignedTo: Contacts;
  Object = Object;
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
    phone: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false),
    isActive: new FormControl(false),
  });
  constructor(
    private message: NzMessageService,
    private auth: AuthService,
    private contactService: ContactsService,
    private salesOrderService: SalesOrderService,
    private communication: CommnunicatetionService,
    private router: Router
  ) {
    this.status = new SalesOrder();
    this.assignedTo = new Contacts();
    this.arrCompare1 = false;
    this.arrCompare2 = new SalesOrder();
  }
  ngOnInit(): void {
    this.getAllContacts();
    this.getAllSalesOrder();
    this.getAllNewContact();
    this.getAllNewSalesOrder();
    this.getAll();
    this.getProfile();
  }

  cancel(): void {
    this.message.info('click cancel');
  }
  confirm(): void {
    this.auth.doLogout();
    this.message.success('Logout successfully');
  }
  getAll(): void {
    this.contactService.getAllList().subscribe(
      (res) => {
        const mp = {};
        console.log('Contacts list', res.data.contacts);
        this.contactArr = res.data.contacts;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAllSalesOrder(): void {
    this.salesOrderService.getAllList().subscribe(
      (res) => {
        console.log('Sales order list', res);
        this.salesOrderArr = res.data.salesOrder;
        var result = res.data.salesOrder.reduce(function (r: any, a: any) {
          r[a.status] = r[a.status] || [];
          r[a.status].push(a);
          return r;
        }, Object.create(null));
        this.objectDemoNext = Object.keys(result);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAllContacts(): void {
    this.contactService.getAllList().subscribe(
      (res) => {
        const mp = {};
        console.log('Contacts list', res.data.contacts);
        this.contactArr = res.data.contacts;
        this.arr = res.data.contacts;
        var result = res.data.contacts.reduce(function (r: any, a: any) {
          r[a.leadSrc] = r[a.leadSrc] || [];
          r[a.leadSrc].push(a);
          return r;
        }, Object.create(null));
        console.log(result);
        this.contactArr = res.data.contacts;
        this.objectDemo1 = result;
        this.objectDemo = Object.keys(result);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAllNewSalesOrder(): void {
    var dateDemo: any;
    dateDemo = new Date('2021-11-05');
    this.salesOrderService.getAllList().subscribe(
      (res) => {
        console.log(res.data.salesOrder);
        const request = res.data.salesOrder.filter(
          (us: any) => new Date(us.createdTime) < dateDemo
        );
        console.log(request);
        this.arrCompareNext = request;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAllNewContact(): void {
    var dateDemo: any;
    dateDemo = new Date('2021-11-08T03:08:55.748Z');
    var result = dateDemo.toISOString();
    console.log(result);
    this.contactService.getAllList().subscribe(
      (res) => {
        console.log(res.data.contacts.map((us: any) => us.createdTime));
        const request = res.data.contacts.filter(
          (us: any) => new Date(us.createdTime) < dateDemo
        );
        console.log(request);
        this.arrCompare = request;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  handleCount(value: string) {
    return this.contactArr.filter((x) => x.leadSrc === value).length;
  }
  handleCount_salesOrder(value: string) {
    return this.salesOrderArr.filter((x) => x.status === value).length;
  }
  getSelectedContact(leadSrc: any): void {
    this.leadSrc = leadSrc;
    this.router.navigate(['contacts'], {
      queryParams: { variable: this.leadSrc },
    });
  }
  getSelectedContact2(leadSrc: any): void {
    this.leadSrc = leadSrc;
    this.router.navigate(['contacts'], {
      queryParams: { variable2: this.leadSrc },
    });
  }
  getSelectedSalesOrder(status: SalesOrder): void {
    this.status = status;
    this.router.navigate(['sales-order'], {
      queryParams: { status: this.status },
    });
  }
  return(): void {
    this.arrCompare1 = false;
  }
  getValueSales(value: any): void {
    this.arrCompare1 = true;
    console.log(value);
    this.arrCompare2 = value;
  }
  getProfile(): void {
    this.auth.getUserProfile().subscribe(
      (res) => {
        console.log('User Profile current user', res.data.user);
        this.patchValue(res.data.user);
        this.user=res.data.user
        window.sessionStorage.setItem('id', res.data.user._id);
      },
      (error: any) => {
        console.log('Error user profile', error);
      }
    );
  }
  patchValue(users: User) {
    this.form.patchValue({
      name: users.name,
      username: users.username,
      email: users.email,
      phone: users.phone,
      password: users.password,
      isAdmin: users.isAdmin?.toString(),
      isActive: users.isActive?.toString(),
    });
    console.log('Value current user', this.form.value);
  }
}
