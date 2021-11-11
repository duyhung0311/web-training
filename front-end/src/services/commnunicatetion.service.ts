import { Injectable,EventEmitter } from '@angular/core';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
import {Contacts} from './../model/contact.model'
@Injectable({
  providedIn: 'root',
})
export class CommnunicatetionService {
  leadSrc: string;
  receivedFilter: EventEmitter<string>;
  constructor() {
    this.receivedFilter = new EventEmitter<string>();
    this.leadSrc = '';
  }
  raiseEvent(leadSrc: string): void {
    this.leadSrc = leadSrc;
    this.receivedFilter.emit(leadSrc);
  }
}
