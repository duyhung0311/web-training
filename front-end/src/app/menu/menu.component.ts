import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/model/user.model';
import { AuthService } from '../../services/auth.service';
import { Router,NavigationEnd  } from '@angular/router';
import {
  faUsers,
  faUser,
  faEnvelope,
  faPhoneVolume,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}
  faUsers = faUsers;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faPhone = faPhoneVolume;
  faUserCircle = faUserCircle;
  usArr: any[0] = [];
  user = {
    name: '',
    username: '',
    email: '',
    phone: '',
    isAdmin: '',
    isActive: '',
  };
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
  ngOnInit(): void {
    this.getProfile();
  }
  logout() {
    this.auth.doLogout();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  }
  getProfile(): void {
    this.auth.getUserProfile().subscribe(
      (res) => {
        this.user = res.data.user;
        this.usArr = res.data.user;
        localStorage.setItem('isAdmin', res.data.user.isAdmin);
        this.patchValue(res.data.user);
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
  }
  click(){
        localStorage.setItem('checkCSS', 'false');
  }
  unClick(){
     localStorage.setItem('checkCSS', 'true');
  }
  checkPossibility(){
    localStorage.setItem('checkHome','true')
  }
}
