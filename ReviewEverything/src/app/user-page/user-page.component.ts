import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
    user;
    currentUserId = localStorage.getItem('userId');

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId).subscribe((res :any) => {
            this.user = res;
        });
    }
}