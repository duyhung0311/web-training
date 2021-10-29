import { Component } from '@angular/core';
import {
  faCoffee,
  faPhoneVolume,
  faShoppingBasket,
  faUsers,
  faPlus,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front-end';
  faPhoneVolume = faPhoneVolume;
  faShoppingBasket = faShoppingBasket;
  faUsers = faUsers;
  faPlus = faPlus;
  faChartLine = faChartLine;
  faCoffee = faCoffee;
}
