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
import {UserServiceService} from '../../services/user-service.service'
// interface Person {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
// }
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
  listOfData:any
  constructor(private userService: UserServiceService) {}
  ngOnInit(): void {
    this.getUsers()
  }
  // listOfData: Person[] = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  // ];
  getUsers(): void {
    this.userService.getAll().subscribe(
      (book:any) => {
        this.listOfData=book
        console.log("success")
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
