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
import { ChartType, ChartOptions,ChartDataSets } from 'chart.js';
import {
  SingleDataSet,
  Label,
  MultiDataSet,

  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
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
  newArr: any[] = [];
  newArr_after: any[] = [];
  keyArr: any[] = [];
  valueArr: any[] = [];
  keyArr_us: any[] = [];
  valueArr_us: any[] = [];
  keyArrStatus: any[] = [];
  valueArrStatus: any[] = [];
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
  // pieChart p1
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = this.keyArr;
  public pieChartData: SingleDataSet = this.valueArr;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array<any> = [
    {
      backgroundColor:[ '#ffa1b5','#86c7f3','#ffe29a', '#eeeff2','#93d9d9', '#c1d6e1'],
    }
  ];
  //pie chart p2
  public pieChartOptions_2: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels_second: Label[] = this.keyArrStatus;
  public pieChartData_second: SingleDataSet = this.valueArrStatus;
  //pie chart p3
  // public doughnutChartLabels: Label[] = this.keyArr_us;
  // public doughnutChartData: MultiDataSet = this.valueArr_us;
  // public doughnutChartType: ChartType = 'doughnut';

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = this.keyArr_us;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = this.valueArr_us;

  // public pieChartLabels_third: Label[] = this.keyArr_us;
  // public pieChartData_third: SingleDataSet = this.valueArr_us;
  // public pieChartType_: ChartType = 'pie';
  // public pieChartLegend_ = true;
  // public pieChartPlugins_ = [];
  // public pieChartOptions_: ChartOptions = {
  //   responsive: true,
  // };
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
        for (let x in result) {
          this.newArr_after.push({ [x]: result[x].length });
        }
        console.log(this.newArr_after);
        for (var i = 0, l = this.newArr_after.length; i < l; i++) {
          var items = this.newArr_after[i];
          var keys = Object.keys(items);
          for (var j = 0, k = keys.length; j < k; j++) {
            console.log(keys[j], items[keys[j]]);
            this.keyArrStatus.push(keys[j]);
            this.valueArrStatus.push(items[keys[j]]);

            console.log(this.keyArrStatus, this.valueArrStatus);
          }
        }
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
        for (let x in result) {
          this.newArr.push({ [x]: result[x].length });
        }
        //  this.newArr.forEach((k,v)=>
        //  console.log("Key is" + this.Object,))
        console.log(this.newArr);
        for (var i = 0, l = this.newArr.length; i < l; i++) {
          var items = this.newArr[i];
          var keys = Object.keys(items);
          for (var j = 0, k = keys.length; j < k; j++) {
            console.log(keys[j], items[keys[j]]);
            this.keyArr.push(keys[j]);
            this.valueArr.push(items[keys[j]]);
            this.keyArr_us.push(keys[j]);
            this.valueArr_us.push(items[keys[j]]);
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAllNewSalesOrder(): void {
    var dateDemo: any;
    dateDemo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
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
    dateDemo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
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
    const x = this.contactArr.filter((x) => x.leadSrc === value).length;
    const arr = [];
    arr.push(x);
    return this.contactArr.filter((x) => x.leadSrc === value).length;
  }
  handleCount_salesOrder(value: string) {
    return this.salesOrderArr.filter((x) => x.status === value).length;
  }
  getSelectedContact(leadSrc: any): void {
    this.leadSrc = leadSrc;
    localStorage.setItem('checkCSS', 'true');
    this.router.navigate(['/home/contacts'], {
      queryParams: { variable: this.leadSrc },
    });
  }
  getSelectedContact2(leadSrc: any): void {
    this.leadSrc = leadSrc;
    console.log(leadSrc);
    localStorage.setItem('checkCSS', 'true');
    this.router.navigate(['/home/contacts'], {
      queryParams: { variable2: this.leadSrc },
    });
  }
  getSelectedSalesOrder(status: SalesOrder): void {
    this.status = status;
    localStorage.setItem('checkCSS', 'true');
    this.router.navigate(['/home/sales-order'], {
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
        this.user = res.data.user;
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
  chartClicked(e: any) {
    console.log(e);
    console.log('=========Chart clicked============');
  }
  chartHovered(e: any) {
    console.log(e);
    console.log('=========Chart hovered============');
  }
}
