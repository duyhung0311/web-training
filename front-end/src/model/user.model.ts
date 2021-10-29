export class User{
   name:  String;
    username:  String;
    password:String;
    email:  String;
    phone: String;
    isAdmin: Boolean;
    isActive: Boolean;
    createdTime: Date;
    constructor() {
      this.name='',
      this.username='',
      this.password='',
      this.email='',
      this.phone='',
      this.isAdmin=false,
      this.isActive=false,
      this.createdTime=new Date()
    }
}
