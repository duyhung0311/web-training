import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SalesOrder } from 'src/model/sales-order.model';
import { User } from 'src/model/user.model';
import { AuthService } from 'src/services/auth.service';
import { CommnunicatetionService } from 'src/services/commnunicatetion.service';
import { SalesOrderService } from 'src/services/sales-order.service';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/services/contacts.service';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
})
export class SalesOrderComponent implements OnInit {
  isVisible = false;
  isVisible2 = false;
  salesOrderArr: any[] = [];
  userArr: any[] = [];
  usSelectArr: any[] = [];
  arrContactName: any[] = [];
  usArr: any[0] = [];
  arr_edit: string;
  Status: string;
  form_select = new FormGroup({
    selectAssignedTo: new FormControl('', [Validators.required]),
    selectStatus: new FormControl('', [Validators.required]),
  });
  form = new FormGroup({
    search: new FormControl('', [Validators.required]),
    creator: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    contactName: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
    assignedTo: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
    phone: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false),
    isActive: new FormControl(false),
  });
  listIdSelect: string[] = [];
  isCheckAll: boolean = false;
  constructor(
    private message: NzMessageService,
    private auth: AuthService,
    private salesOrderService: SalesOrderService,
    private usService: UserService,
    private communication: CommnunicatetionService,
    private router: ActivatedRoute,
    private contactUS: ContactsService
  ) {
    this.Status = '';
    this.arr_edit = '';
  }

  ngOnInit(): void {
    this.getAllSalesOrder();
    this.getAllUsers();
    this.getProfile();
    this.getAllContactName();
    this.router.queryParams.subscribe((params) => {
      this.Status = params.status;
      this.form_select.get('selectStatus')?.setValue(params.status);
      if (params.status) {
        this.selectStatus(params.status);
      }
    });
  }
  cancel(): void {
    this.message.info('click cancel');
  }

  confirm(): void {
    this.auth.doLogout();
    this.message.success('Logout successfully');
  }
  showModal_createUser(): void {
    this.isVisible = true;
    this.form.reset();
  }
  getAllSalesOrder(): void {
    this.salesOrderService.getAllList().subscribe(
      (res) => {
        console.log('Sales order list', res);
        this.salesOrderArr = res.data.salesOrder;
        this.salesOrderArr = this.salesOrderArr.map((x) => ({
          isCheck: false,
          _id: x._id,
          subject: x.subject,
          contactName: x.contactName,
          status: x.status,
          total: x.total,
          assignedTo: x.assignedTo,
          creator: x.creator,
          description: x.description,
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAllUsers(): void {
    this.usService.get().subscribe(
      (res) => {
        this.userArr = res.data.users;
        this.usSelectArr = res.data.users;
        console.log('Get success when get all user', res.data.users);
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
    console.log('value input modal create sales order', this.form.value);
    this.salesOrderService.create(this.form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('thanh cong');
        if ((res.status = 1)) {
          this.isVisible = false;
          this.message.success('Create sales order successfully');
          this.getAllSalesOrder();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleCancel_editUser(): void {
    console.log('Cancel modal edit user');
    this.isVisible2 = false;
  }
  // Get by id
  getByIdSalesOrder(idSelected: string) {
    this.arr_edit = idSelected;
    this.salesOrderService.getById(idSelected).subscribe(
      (res) => {
        this.patchValue(res.data.saleOrder);
        console.log(res.data.saleOrder, 'Response when get by id contact');
        idSelected = res.data.saleOrder._id;
      },
      (error: any) => {
        console.log(error);
      }
    );
    console.log('idSelected', idSelected);
    return idSelected;
  }
  patchValue(sale: SalesOrder) {
    this.form.patchValue({
      creator: sale.creator,
      subject: sale.subject,
      contactName: sale.contactName,
      status: sale.status,
      total: sale.total,
      assignedTo: sale.assignedTo,
      description: sale.description,
    });
    console.log(this.form.value);
    this.isVisible2 = true;
  }
  patchValue_delete(sale: SalesOrder) {
    this.form.patchValue({
      creator: sale.creator,
      subject: sale.subject,
      contactName: sale.contactName,
      status: sale.status,
      total: sale.total,
      assignedTo: sale.assignedTo,
      description: sale.description,
    });
    console.log(this.form.value);
  }
  submit_edit(id2: string): void {
    console.log('value input', this.form.value);
    let idAr = this.getByIdSalesOrder(id2);
    console.log(this.salesOrderArr, '/update');
    console.log('idSelected after open modal', idAr);
    this.salesOrderService.update(idAr, this.form.value).subscribe(
      (res) => {
        console.log(res, 'RESPONSE');
        if ((res.message = 'Success')) {
          this.isVisible2 = false;
          this.message.success('Edit sales order successfully');
          this.getAllSalesOrder();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getById(id: string) {
    this.salesOrderService.getById(id).subscribe(
      (res) => {
        this.patchValue_delete(res.data.saleOrder);
        console.log('Get id sale order by deleting', res);
        id = res.data.saleOrder._id;
      },
      (error: any) => {
        console.log(error);
      }
    );
    return id;
  }
  delete_one(id: string): void {
    let id2 = this.getById(id);
    console.log('id2', id2);
    this.salesOrderService.delete(id2).subscribe(
      (res) => {
        console.log('Delete successfully sales order', res);
        if ((res.status = 1)) {
          this.message.success('Delete sales order successfully');
          this.getAllSalesOrder();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  // Delete multiple
  checkAll() {
    if (this.listIdSelect.length < this.salesOrderArr.length) {
      //check
      this.listIdSelect = Object.values(this.salesOrderArr.map((x) => x._id));
      this.isCheckAll = true;
      this.salesOrderArr.map((x) => {
        x.isCheck = true;
      });
    } else {
      //uncheck
      this.listIdSelect = [];
      this.isCheckAll = false;
      this.salesOrderArr.map((x) => {
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
      if (this.listIdSelect.length < this.salesOrderArr.length) {
        this.isCheckAll = false;
      }
    } else {
      this.listIdSelect.push(id);
      if (this.listIdSelect.length === this.salesOrderArr.length) {
        this.isCheckAll = true;
      }
    }
    console.log(this.listIdSelect);
  }
  delete_multiple(id: string[] = []): void {
    console.log(id);
    id = this.listIdSelect;
    id.length === 0
      ? this.message.warning(
          'Please choose at the radio of sales order and then system can delete it!'
        )
      : this.salesOrderService.delete_multiple(id).subscribe(
          (res) => {
            console.log('Delete multiple successfully sales order', res);
            if ((res.status = 1)) {
              this.message.success(
                'Delete sales order you clicked was successful'
              );
              this.getAllSalesOrder();
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
  }
  // get contact name
  getContactName(): void {
    console.log(this.form.value.search);
    this.form.value.search === ''
      ? this.getAllSalesOrder()
      : this.salesOrderService.getContactName(this.form.value.search).subscribe(
          (res) => {
            console.log('Find contact name rightly', res.data.salesOrder);
            this.salesOrderArr = res.data.salesOrder;
          },
          (error: any) => {
            console.log('Error', error);
          }
        );
  }
  // get All contact
  getAllContactName(): void {
    this.contactUS.getAllList().subscribe(
      (res) => {
        this.arrContactName = res.data.contacts;
        console.log('Get all contacts name', res.data.contacts);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
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
  selectAssignedTo(value?: string): void {
     console.log(value);
     var data: any;
     value === null
       ? this.getAllSalesOrder()
       : (data = this.salesOrderArr.filter((us: any) => us.assignedTo === value));
     this.salesOrderArr = data;
  }
  selectStatus(value: string): void {
    console.log(value);
    var data: any;
    value === null
      ? this.getAllSalesOrder()
      : (data = this.salesOrderArr.filter((us: any) => us.status === value));
    this.salesOrderArr = data;
  }
}
