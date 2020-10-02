import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserData } from 'src/app/userManagement/UserManagement/UserData';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  getUserUrl = "https://localhost:5001/Dashboard/";
  users: Number;
  usersData: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    //read number of users
    this.usersData = this.http.get(this.getUserUrl).subscribe((result) => {

      this.users = result.length;

    });

  }

}
