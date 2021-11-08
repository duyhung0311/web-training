import { faSleigh } from "@fortawesome/free-solid-svg-icons";

export class Contacts {
  isCheck: boolean;
  _id: string;
  creator: string;
  contactName: string;
  salutation: string;
  mobilePhone: string;
  email: string;
  organization: string;
  dob: string;
  leadSrc: string;
  assignedTo: string;
  address: string;
  description: string;
  constructor() {
    this.isCheck = false;
    this.creator = '';
    this.contactName = '';
    this.salutation = '';
    this.email = '';
    this.organization = '';
    this.dob = '';
    this.leadSrc = '';
    this.assignedTo = '';
    this.address = '';
    this.description = '';
    this.mobilePhone = '';
    this._id = '';
  }
}
