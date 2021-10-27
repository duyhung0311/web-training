import { Component, OnInit } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCreateUsermanagementComponent } from '../crud-usermanagement/dialog-create-usermanagement/dialog-create-usermanagement.component';
import {DialogEditUsermanagementComponent} from '../crud-usermanagement/dialog-edit-usermanagement/dialog-edit-usermanagement.component'
import {DialogDeleteUsermanagementComponent} from '../crud-usermanagement/dialog-delete-usermanagement/dialog-delete-usermanagement.component'
export interface PeriodicElement {
  name: string;
  username: string;
  email: string;
  phone: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Duy',
    username: 'nduy9744',
    email: 'nduy9744@gmail.com',
    phone: '0901632176',
    actions: '',
  },
  {
    name: 'Duy',
    username: 'nduy9744',
    email: 'nduy9744@gmail.com',
    phone: '0901632176',
    actions: '',
  },
  {
    name: 'Duy',
    username: 'nduy9744',
    email: 'nduy9744@gmail.com',
    phone: '0901632176',
    actions: '',
  },
];
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  showFiller = false;
  faChartLine = faChartLine;
  faPhoneVolume = faPhoneVolume;
  faShoppingBasket = faShoppingBasket;
  faUsers = faUsers;
  faPlus = faPlus;
  displayedColumns: string[] = [
    'name',
    'username',
    'email',
    'phone',
    'actions',
  ];
  dataSource = ELEMENT_DATA;
  constructor(private matDialog: MatDialog) {}
  openDialog_Usermanagement() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogCreateUsermanagementComponent, dialogConfig);
  }
  openDialogEdit_Usermanagement() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogEditUsermanagementComponent, dialogConfig);
  }
  openDialogDelete_Usermanagement() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogDeleteUsermanagementComponent, dialogConfig);
  }
  ngOnInit(): void {}
}
