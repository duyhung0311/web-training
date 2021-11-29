import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/services/auth.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  check: any;
  check1: any;
  faPlus = faPlus;
  constructor(
    private nzMessageService: NzMessageService,
    private auth: AuthService,
    private message: NzMessageService
  ) {
    this.check = 'false';
  }

  ngOnInit(): void {
    localStorage.getItem('checkCSS') === 'true'
      ? this.check === true
      : this.check === false;
    console.log(this.check);

  }
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }
  confirm(): void {
    this.auth.doLogout();
    this.message.success('Logout successfully');
  }
}
