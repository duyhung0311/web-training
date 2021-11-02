import { Component, OnInit } from '@angular/core';
import {
  faCoffee,
  faPhoneVolume,
  faShoppingBasket,
  faUsers,
  faPlus,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from './../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/model/user.model';
import {  NzMessageService } from 'ng-zorro-antd/message';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  faPhoneVolume = faPhoneVolume;
  faShoppingBasket = faShoppingBasket;
  faUsers = faUsers;
  faPlus = faPlus;
  faChartLine = faChartLine;
  faCoffee = faCoffee;
  displayedColumns: string[] = [
    'name',
    'username',
    'email',
    'phone',
    'isAdmin',
    'isActive',
    'action',
  ];
  userArr: any[] = [];
  isVisible = false;
  isVisible2 = false;
  radioValue = 'A';
  radioValue1 = 'A';
  idSelected: any;
  constructor(
    private usService: UserService,
    private nzMessageService: NzMessageService,
    private auth:AuthService
  ) {}
  ngOnInit(): void {
    this.getAllUsers();
    this.getProfile();
  }
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
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.auth.doLogout()
  }
  getAllUsers(): void {
    this.usService.get().subscribe(
      (res) => {
        this.userArr = res.data.users;
        console.log(this.userArr);
        console.log('Get success');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getProfile():void {
    this.auth.getUserProfile().subscribe(
      res=>{
         console.log("User Profile current user",res)
      },
      (error:any)=>{
        console.log("Error user profile",error)
      }
    )
  }
  showModal_createUser(): void {
    this.isVisible = true;
  }
  handleOk_createUser(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleCancel_createUser(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  showModal_editUser(): void {
    console.log('Open modal Edit user');
    this.isVisible2 = true;
  }
  handleCancel_editUser(): void {
    console.log('Cancel modal edit user');
    this.isVisible2 = false;
  }
  editUser(idSelected: string) {
    this.usService.getById(idSelected).subscribe(
      (res) => {
        console.log(res.data.user._id, 'id');
        this.patchValue(res.data.user);
        console.log(res, 'res');
        idSelected = res.data.user._id;
      },
      (error: any) => {
        console.log(error);
      }
    );
    console.log('idSelected', idSelected);
    return idSelected;
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
    console.log(this.form.value);
    this.isVisible2 = true;
  }
  submit(): void {
    console.log(this.form.value);
    this.usService.create(this.form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('thanh cong');
        if ((res.status = 1)) {
          this.isVisible = false;
          this.getAllUsers();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  submit_edit(id2: string): void {
    console.log('value input', this.form.value);
    let idAr = this.editUser(id2);
    console.log(this.userArr, '/update');
    console.log('idSelected after open modal', idAr);
    this.usService.update(idAr, this.form.value).subscribe(
      (res) => {
        console.log(res, 'RESPONSE');
        if ((res.message = 'Success')) {
          this.isVisible2 = false;
          this.getAllUsers();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
    // this.usService.update(this.userArr._id,this.userArr).subscribe(
    //   (res) => {
    //     console.log(res);
    //     console.log('thanh cong');

    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
