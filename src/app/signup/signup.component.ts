import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Signup } from '../core/models/signup';
import { AuthService } from '../core/services/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private sev: AuthService, private snakbar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = "top";

  openSnakbar() {
    this.snakbar.open('Successfully added');
  }


  store!: Signup[];
  hide = true;

  user = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.user.invalid) {
      return;
    }
  }


  getid() {
    if (this.user.controls['id'].hasError('required')) {
      return 'Form field cannot be empty'
    }
    return '';
  }


  getname() {
    if (this.user.controls['name'].hasError('required')) {
      return 'Form Field cannot be empty';
    }
    return '';
  }

  getemail() {
    if (this.user.controls['email'].hasError('required')) {
      return 'Form Field cannot be empty';
    }

    return this.user.controls['email'].hasError('email') ? 'valid email required' : '';
  }

  getpassword() {
    if (this.user.controls['password'].hasError('required')) {
      return 'Form filed cannot be empty';
    }
    return '';
  }

  getconfirm_password() {
    if (this.user.controls['confirm_password'].hasError('required')) {
      return 'Form field cannot be empty';
    }

    return this.user.controls['confirm_password'].value == this.user.controls['password'].value ? 'not match' : '';
  }



  data() {
    this.sev.data().subscribe(
      data => {
        this.store = data;
        console.log(data);
      }
    )
  }

  send() {

    let user = new Signup();

    user.id = this.user.controls['id'].value;
    user.name = this.user.controls['name'].value;
    user.email = this.user.controls['email'].value;
    user.password = this.user.controls['password'].value;
    user.confirm_password = this.user.controls['confirm_password'].value;

    this.sev.signup(user).subscribe(
      data => {
        console.log(data);
        this.openSnakbar();
        this.user.reset();
      }
    )

  }

  ngOnInit(): void {
    this.data();
  }

}
