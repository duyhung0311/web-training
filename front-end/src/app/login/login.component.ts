import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './../../services/auth.service';
import { TokenStorageService } from './../../services/token-storage.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  passwordVisible = false;
  password?: string;
  validateForm!: FormGroup;
  form_login = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private message: NzMessageService,
  ) {}
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
  submitLogin(type: string): void {
    console.log('Value input login', this.form_login.value.username);
    this.auth.login(this.form_login.value).subscribe((res) => {
      console.log('successful res', res);
      this.tokenStorage.saveToken(res.data.token);
      this.tokenStorage.saveUser(this.form_login.value.username);
      if ((res.status = 1)) {
        this.form_login.reset();
        this.message.success('Login successfully');
        this.router.navigate(['dashboard']);
      }
      else {
        this.message.error('Login failed')
      }
    });
    (error: any) => {
      console.log('Error user profile', error);
      this.message.error('Login failed');
    };
  }

}
