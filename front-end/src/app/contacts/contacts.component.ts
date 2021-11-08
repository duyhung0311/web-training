import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/model/user.model';
import { Contacts } from 'src/model/contact.model';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { ContactsService } from 'src/services/contacts.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  isVisible = false;
  isVisible2 = false;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Contacts[] = [];
  listOfCurrentPageData: readonly Contacts[] = [];
  setOfCheckedId = new Set<string>();
  userArr: any[] = [];
  userArr1 = new User();
  contactArr: Contacts[] = [];
  editId: string | null = null;
  passwordVisible = false;
  listIdSelect: string[] = [];
  isCheckAll: boolean = false;
  usArr: any[0] = [];
  displayedColumns: string[] = [
    'creator',
    'contactName',
    'salutation',
    'mobilePhone',
    'dob',
    'leadSrc',
    'assignedTo',
    'actions',
  ];
  form = new FormGroup({
    creator: new FormControl('', [Validators.required]),
    contactName: new FormControl('', [Validators.required]),
    salutation: new FormControl('', [Validators.required]),
    mobilePhone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    leadSrc: new FormControl('', [Validators.required]),
    assignedTo: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    search: new FormControl('', [Validators.required]),
  });
  constructor(
    private message: NzMessageService,
    private auth: AuthService,
    private usService: UserService,
    private contactService: ContactsService
  ) {}
  ngOnInit(): void {
    this.getAllContacts();
    this.getAllUsers();
    this.listOfData = this.contactArr;
    this.getProfile();
  }
  // Table

  cancel(): void {
    this.message.info('click cancel');
  }
  confirm(): void {
    this.auth.doLogout();
    this.message.success('Logout successfully');
  }
  showModal_createUser(): void {
    this.isVisible = true;
  }
  showModal_edit(): void {
    this.isVisible2 = true;
  }
  getAllUsers(): void {
    this.usService.get().subscribe(
      (res) => {
        this.userArr = res.data.users;
        this.userArr1 = res.data.users;
        console.log('Get success when get all user', res.data.users);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getByIdContact(id: string) {
    this.contactService.getById(id).subscribe(
      (res) => {
        this.patchValue_delete(res.data.contact);
        console.log('Get id contact by deleting', res);
        id = res.data.contact._id;
      },
      (error: any) => {
        console.log(error);
      }
    );
    return id;
  }
  patchValue_delete(contacts: Contacts) {
    this.form.patchValue({
      creator: contacts.creator,
      contactName: contacts.contactName,
      salutation: contacts.salutation,
      mobilePhone: contacts.mobilePhone,
      email: contacts.mobilePhone,
      organization: contacts.organization,
      dob: contacts.dob,
      leadSrc: contacts.leadSrc,
      assignedTo: contacts.assignedTo,
      address: contacts.address,
      description: contacts.description,
    });
    console.log(this.form.value);
  }
  editContact(idSelected: string) {
    this.contactService.getById(idSelected).subscribe(
      (res) => {
        this.patchValue(res.data.contact);
        console.log(res, 'Response when get by id contact');
        idSelected = res.data.contact._id;
      },
      (error: any) => {
        console.log(error);
      }
    );
    console.log('idSelected', idSelected);
    return idSelected;
  }
  patchValue(contacts: Contacts) {
    this.form.patchValue({
      creator: contacts.creator,
      contactName: contacts.contactName,
      salutation: contacts.salutation,
      mobilePhone: contacts.mobilePhone,
      email: contacts.mobilePhone,
      organization: contacts.organization,
      dob: contacts.dob,
      leadSrc: contacts.leadSrc,
      assignedTo: contacts.assignedTo,
      address: contacts.address,
      description: contacts.description,
    });
    console.log(this.form.value);
    this.isVisible2 = true;
  }
  handleCancel_editUser(): void {
    console.log('Cancel modal edit user');
    this.isVisible2 = false;
  }
  delete_one(id: string): void {
    let id2 = this.getByIdContact(id);
    console.log('id2', id2);
    this.contactService.delete(id2).subscribe(
      (res) => {
        console.log('Delete successfully contact', res);
        if ((res.status = 1)) {
          this.message.success('Delete contact successfully');
          this.getAllContacts();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  submit_edit(id2: string): void {
    console.log('value input', this.form.value);
    let idAr = this.editContact(id2);
    console.log(this.contactArr, '/update');
    console.log('idSelected after open modal', idAr);
    this.contactService.update(idAr, this.form.value).subscribe(
      (res) => {
        console.log(res, 'RESPONSE');
        if ((res.message = 'Success')) {
          this.isVisible2 = false;
          this.message.success('Edit contact successfully');
          this.getAllContacts();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  handleCancel_createUser(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  submit(): void {
    console.log('value input modal create contacts', this.form.value);
    this.contactService.create(this.form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('thanh cong');
        if ((res.status = 1)) {
          this.isVisible = false;
          this.message.success('Create contacts successfully');
          this.getAllContacts();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Get all list
  getAllContacts(): void {
    this.contactService.getAllList().subscribe(
      (res) => {
        console.log('Contacts list', res);
        this.contactArr = res.data.contacts;
        this.contactArr = this.contactArr.map((x) => ({
          isCheck: false,
          _id: x._id,
          creator: x.creator,
          contactName: x.contactName,
          salutation: x.salutation,
          mobilePhone: x.mobilePhone,
          email: x.email,
          organization: x.organization,
          dob: x.dob,
          leadSrc: x.leadSrc,
          assignedTo: x.assignedTo,
          address: x.address,
          description: x.description,
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  // Delete
  checkAll() {
    if (this.listIdSelect.length < this.contactArr.length) {
      //check
      this.listIdSelect = Object.values(this.contactArr.map((x) => x._id));
      this.isCheckAll = true;
      this.contactArr.map((x) => {
        x.isCheck = true;
      });
    } else {
      //uncheck
      this.listIdSelect = [];
      this.isCheckAll = false;
      this.contactArr.map((x) => {
        x.isCheck = false;
      });
    }
    console.log(this.listIdSelect);
  }

  checkItem(id: string, check: boolean) {
    if (check) {
      this.listIdSelect.splice(
        this.listIdSelect.findIndex((x) => x === id),
        1
      );
      if (this.listIdSelect.length < this.contactArr.length) {
        this.isCheckAll = false;
      }
    } else {
      this.listIdSelect.push(id);
      if (this.listIdSelect.length === this.contactArr.length) {
        this.isCheckAll = true;
      }
    }
    console.log(this.listIdSelect);
  }
  delete_multiple(id: string[] = []): void {
    id = this.listIdSelect;
    this.contactService.delete_multiple(id).subscribe(
      (res) => {
        console.log('Delete multiple successfully contact', res);
        if ((res.status = 1)) {
          this.message.success('Delete contacts you clicked was successful');
          this.getAllContacts();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  // Get contact name
  getContactName(): void {
    console.log(this.form.value.search);
    if (this.form.value.search === '') {
      this.getAllContacts();
    } else {
      this.contactService.getContactName(this.form.value.search).subscribe(
        (res) => {
          console.log('Find contact name righly', res.data.contacts);
          this.contactArr = res.data.contacts;
        },
        (error: any) => {
          console.log('Error', error);
        }
      );
    }
  }
  // GetProfile
  // get Profile\
  patchValue_profile(users: User) {
    this.form.patchValue({
      name: users.name,
      username: users.username,
      email: users.email,
      phone: users.phone,
      password: users.password,
      isAdmin: users.isAdmin?.toString(),
      isActive: users.isActive?.toString(),
    });
    console.log('Value current user', this.form.value);
  }
  getProfile(): void {
    this.auth.getUserProfile().subscribe(
      (res) => {
        console.log('User Profile current user', res.data.user);
        this.patchValue_profile(res.data.user);
        this.usArr = res.data.user;
        window.sessionStorage.setItem('id', res.data.user._id);
      },
      (error: any) => {
        console.log('Error user profile', error);
      }
    );
  }
}
