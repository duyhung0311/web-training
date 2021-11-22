import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isCollapsed = false;
  checkedLoggedIn = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.check()
  }
  check(){
  window.sessionStorage.getItem('auth-token')
    ? (this.checkedLoggedIn = true)
    : (this.checkedLoggedIn = false);
  }
}
