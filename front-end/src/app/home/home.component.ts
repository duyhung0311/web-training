import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  check:any
  check1:any
  constructor() {
    this.check='false'
  }

  ngOnInit(): void {
    localStorage.getItem('checkCSS')==='true' ? this.check ===true : this.check===false
    console.log(this.check)
  }

}
