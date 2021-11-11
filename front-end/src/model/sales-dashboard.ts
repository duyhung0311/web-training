export class SalesOrder {
  _id: string;
  creator: string;
  subject: string;
  contactName: string;
  status: string;
  total: string;
  assignedTo: string;
  description: string;
  createdTime: Date;
  constructor() {
    this._id = '';
    this.creator = '';
    this.subject = '';
    this.contactName = '';
    this.status = '';
    this.total = '';
    this.assignedTo = '';
    this.description = '';
    this.createdTime = new Date();
  }
}
