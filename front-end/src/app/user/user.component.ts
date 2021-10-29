import { Component, OnInit } from '@angular/core';
import { faCoffee,faPhoneVolume,faShoppingBasket,faUsers,faPlus,faChartLine } from '@fortawesome/free-solid-svg-icons';

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
  faCoffee=faCoffee
  constructor() {}

  ngOnInit(): void {}
}
