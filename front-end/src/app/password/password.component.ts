import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User, UserChangePass } from 'src/model/user.model';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  passwordVisible = false;
  passwordVisible1 = false;
  passwordVisible2 = false;
  userArr: any[] = [];
  password?: string;
  idCurrent: any;
  passUpdated = new UserChangePass();
  currentPassword = {
    current: '',
  };
  idSessionStorage: any;

  form = new FormGroup({
    _id: new FormControl(''),
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
    newPass: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
    confirmPass: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
  });
  form_password = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
  });
  constructor(
    private auth: AuthService,
    private nzMessageService: NzMessageService,
    private us: UserService,
    private token: TokenStorageService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getPassword();
  }
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }
  confirm(): void {
    this.auth.doLogout();
    this.message.success('Logout successfully')
  }
  getProfile(): void {
    this.auth.getUserProfile().subscribe(
      (res) => {
        console.log('Id current user', res.data.user_id);
        this.patchValue(res.data.user);
      },
      (error: any) => {
        console.log('Error user profile', error);
      }
    );
  }
  getPassword(): void {
    let idST: any;
    idST = sessionStorage.getItem('idCurrent');
    console.log('id of current user when getting profile', idST);
    this.us.getById(idST).subscribe(
      (res) => {
        console.log('Old password current user', res.data.user);
        this.patchValue(res.data.user);
      },
      (error: any) => {
        console.log('Error user profile password', error);
      }
    );
  }
  patchValue(users: User) {
    this.form.patchValue({
      _id: users._id,
      name: users.name,
      username: users.username,
      email: users.email,
      phone: users.phone,
      password: users.password,
      isAdmin: users.isAdmin?.toString(),
      isActive: users.isActive?.toString(),
    });
    console.log('Value current user222', this.form.value);
    window.sessionStorage.setItem('idCurrent', this.form.value._id);
    return this.idCurrent;
  }
  changePassword(id: string) {
    this.idSessionStorage = window.sessionStorage.getItem('idCurrent');
    id = this.idSessionStorage;
    console.log('Value input login2222', this.form.value);
    this.passUpdated.newPass = this.form.value.newPass;
    console.log(this.form.value.newPass);
    if (
      this.comparePass(this.form.value.newPass, this.form.value.confirmPass)
    ) {
      this.us.changePassword(id, this.passUpdated).subscribe(
        (res) => {
          console.log(res);
          console.log('thanh cong tao mat khau thanh cong');
          if (res.status === 1) {
            this.message.success('Change password carefully');
            window.location.reload()
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.message.error('Confirmation password failed');
    }
  }
  comparePass(newPass: string, confirmPass: string) {
    if (newPass === confirmPass) {
      return true;
    }
    return false;
  }
}
