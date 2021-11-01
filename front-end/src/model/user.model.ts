export class User{
  _id: string;
  name:String;
  username:String;
  password:String;
  email:String;
  phone:String;
  isAdmin?:Boolean | string;
  isActive?:Boolean | string;
  constructor(){
    this._id="",
    this.name='',
    this.username='',
    this.password='',
    this.email='',
    this.phone=''
    this.isAdmin=false,
    this.isActive=false
  }
}
