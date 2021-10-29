import { Component, OnInit } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCreateUsermanagementComponent } from '../crud-usermanagement/dialog-create-usermanagement/dialog-create-usermanagement.component';
import { DialogEditUsermanagementComponent } from '../crud-usermanagement/dialog-edit-usermanagement/dialog-edit-usermanagement.component';
import { DialogDeleteUsermanagementComponent } from '../crud-usermanagement/dialog-delete-usermanagement/dialog-delete-usermanagement.component';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css', './padding-modal.css'],
})
export class UserManagementComponent implements OnInit {
  showFiller = false;
  faChartLine = faChartLine;
  faPhoneVolume = faPhoneVolume;
  faShoppingBasket = faShoppingBasket;
  faUsers = faUsers;
  faPlus = faPlus;
  listOfData: User[] = [];
  dataPost = {
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  };
  isVisible = false;
  radioValue = 'False';
  form!: FormGroup;
  constructor(
    private userService: UserServiceService,
    private fbd: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getUsers();
    this.addUser();
    this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  getUsers(): void {
    this.userService.getAll().subscribe(
      (res) => {
        this.listOfData = res.data.users;
        console.log('success');
        console.log(this.listOfData);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  showModal_createUser(): void {
    this.isVisible = true;
  }
  handleOk_okCreateUser(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleCancel_cancelCreateUser(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  addUser() {
    const data = {
      name: this.dataPost.name,
      username: this.dataPost.username,
      password: this.dataPost.password,
      email: this.dataPost.email,
      phone: this.dataPost.phone,
      // isAdmin: this.dataPost.isAdmin,
      // isActive: this.dataPost.isActive,
    };
    console.log('dataa', data);
    if(this.form.valid) {

    } else {
      alert("Chưa nhập đủ field")
    }
    this.userService.createEmployee(this.form.value).subscribe(
      (data: {}) => {
        console.log(data);
        console.log('Success create', data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
