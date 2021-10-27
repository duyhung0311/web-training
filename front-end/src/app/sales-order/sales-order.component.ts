import { Component, OnInit } from '@angular/core';
import { DialogCreateComponent } from '../crud-contact/dialog-create/dialog-create.component';
import { DialogEditComponent } from '../crud-contact/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from '../crud-contact/dialog-delete/dialog-delete.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DialogCreateSalesorderComponent } from '../crud-salesorder/dialog-create-salesorder/dialog-create-salesorder.component';
import { DialogEditSalesorderComponent } from '../crud-salesorder/dialog-edit-salesorder/dialog-edit-salesorder.component';
import { DialogDeleteSalesorderComponent } from '../crud-salesorder/dialog-delete-salesorder/dialog-delete-salesorder.component';
export interface PeriodicElement {
  subject:string;
  contactName: string;
  status:string;
  total:string;
  assignedTo:string;
  creator: string;
  description: string;
  actions: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    subject: 'Math',
    contactName: 'Duy',
    status: 'Accept',
    total: '120',
    assignedTo: 'Duy',
    creator: 'Admin',
    description: 'fast',
    actions: '',
  },
  {
    subject: 'Math',
    contactName: 'Duy',
    status: 'Accept',
    total: '120',
    assignedTo: 'Duy',
    creator: 'Admin',
    description: 'fast',
    actions: '',
  },
];
@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
})
export class SalesOrderComponent implements OnInit {
  showFiller = false;
  faChartLine = faChartLine;
  faPhoneVolume = faPhoneVolume;
  faShoppingBasket = faShoppingBasket;
  faUsers = faUsers;
  faPlus = faPlus;
  displayedColumns: string[] = [
    'subject',
    'contactname',
    'status',
    'total',
    'assignedto',
    'creator',
    'description',
    'actions',
  ];
  dataSource = ELEMENT_DATA;
  constructor(private matDialog: MatDialog) {}
  openDialogsalesorder() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogCreateSalesorderComponent, dialogConfig);
  }
  openDialogEditSalesorder() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogEditSalesorderComponent, dialogConfig);
  }
  openDialogDeleteSalesorder() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogDeleteSalesorderComponent, dialogConfig);
  }
  ngOnInit(): void {}
}
