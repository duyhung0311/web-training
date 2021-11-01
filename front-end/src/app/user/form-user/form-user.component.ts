import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent implements OnInit {
  constructor(private usService: UserService) {}
  ngOnInit(): void {}
  public isVisible2 = false;
  userArr: any[] = [];
  isVisible = false;
  form = new FormGroup({
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




  getAllUsers(): void {
    this.usService.get().subscribe(
      (res) => {
        this.userArr = res.data.users;
        console.log(this.userArr);
        console.log('Get success');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  submit(): void {
    console.log(this.form.value);
    this.usService.create(this.form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('thanh cong');
        if ((res.status = 1)) {
          this.isVisible = false;
          this.getAllUsers();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  submit_edit(): void {
    console.log(this.form.value);
    // this.usService.update().subscribe(
    //   (res) => {
    //     console.log(res);
    //     console.log('thanh cong');
    //     if ((res.status = 1)) {
    //       this.isVisible = false;
    //       // this.getAllUsers();
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
