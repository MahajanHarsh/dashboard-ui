import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from './UserData'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-UserManagement',
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css']
})



export class UserManagementComponent implements OnInit {

  showForm: boolean;
  userForm: FormGroup;
  userData: UserData;
  usersData: any;
  userDataString: string;
  url = "https://localhost:5001/Dashboard/AddUser";
  getUserUrl = "https://localhost:5001/Dashboard/";
  showList: boolean = false;
  constructor(private http: HttpClient) { }

  get f() { return this.userForm.controls; }

  ngOnInit() {
    this.showForm = false;
    this.userForm = new FormGroup({
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Customer: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl(),
      Username: new FormControl(),
      IsTrialUser: new FormControl(),
      role: new FormControl()
    });

    this.getData();
    this.showList = true;


  }


  getData() {
    this.usersData = this.http.get(this.getUserUrl).subscribe((result) => {

      this.userDataString = JSON.stringify(result);
      this.showList = true;
      console.log(result);

    });

    console.log(this.usersData);
  }

  addNewUser() {
    this.showForm = true;
    this.showList = false;
  }


  onSubmit() {

    this.userData = {

      customer: this.f.Customer.value,
      firstName: this.f.FirstName.value,
      lastName: this.f.LastName.value,
      isTrialUser: this.f.IsTrialUser.value,
      role: this.f.role.value,
      email: this.f.Email.value,
      userName: this.f.Username.value,
      password: this.f.Password.value
    }

    console.log(this.userData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var data = JSON.stringify(this.userData);

    return this.http.post(this.url, data, httpOptions).subscribe((result) => {

      console.log(result);

    });

    this.getData();

    this.showForm = false;
    this.showList = true;

  }


  reset() {
    this.showForm = false;
    this.showList = true;
  }


}
