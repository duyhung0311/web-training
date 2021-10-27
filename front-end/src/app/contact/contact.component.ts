import { Component, OnInit } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCreateComponent } from '../crud-contact/dialog-create/dialog-create.component';
import { DialogEditComponent } from '../crud-contact/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from '../crud-contact/dialog-delete/dialog-delete.component';

export interface PeriodicElement {
  contactName: string;
  salutation: string;
  mobilePhone: string;
  email: string;
  organization: string;
  dob: string;
  leadSrc: string;
  assignedTo: string;
  creator: string;
  address: string;
  description: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    contactName: 'Duy',
    salutation: 'abcd',
    mobilePhone: '0901632176',
    email: 'nduy9744@gmail.com',
    organization: 'TMA',
    dob: '03-11-1999',
    leadSrc: 'Sib',
    assignedTo: 'Duy',
    creator: 'Admin',
    address: '7 Kỳ Đồng',
    description: 'fast',
    actions: '',
  },
  {
    contactName: 'Duy',
    salutation: 'abcd',
    mobilePhone: '0901632176',
    email: 'nduy9744@gmail.com',
    organization: 'TMA',
    dob: '03-11-1999',
    leadSrc: 'Sib',
    assignedTo: 'Duy',
    creator: 'Admin',
    address: '7 Kỳ Đồng',
    description: 'fast',
    actions: '',
  },
  {
    contactName: 'Duy',
    salutation: 'abcd',
    mobilePhone: '0901632176',
    email: 'nduy9744@gmail.com',
    organization: 'TMA',
    dob: '03-11-1999',
    leadSrc: 'Sib',
    assignedTo: 'Duy',
    creator: 'Admin',
    address: '7 Kỳ Đồng',
    description: 'fast',
    actions: '',
  },
];
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  showFiller = false;
  faChartLine = faChartLine;
  faPhoneVolume = faPhoneVolume;
  faShoppingBasket = faShoppingBasket;
  faUsers = faUsers;
  faPlus = faPlus;
  displayedColumns: string[] = [
    'contactname',
    'saluation',
    'mobilephone',
    'email',
    'organization',
    'dob',
    'leadsrc',
    'assignedto',
    'creator',
    'address',
    'description',
    'actions',
  ];
  dataSource = ELEMENT_DATA;
  constructor(private matDialog: MatDialog) {}
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogCreateComponent, dialogConfig);
  }
  openDialogEdit() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogEditComponent, dialogConfig);
  }
  openDialogDelete() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogDeleteComponent, dialogConfig);
  }
  ngOnInit(): void {}
}
