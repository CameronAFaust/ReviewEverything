import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as Filter from 'bad-words';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
    user;
    usernameForm: FormGroup;
    emailForm: FormGroup;
    passwordForm: FormGroup;
    usernameSubmitted = false;
    emailSubmitted = false;
    passwordSubmitted = false;
    currentUserId = localStorage.getItem('userId');
    constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }

    ngOnInit() {
        if (!this.currentUserId) {
            this.router.navigate(['/']);
        }
        this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId).subscribe((res :any) => {
            this.user = res;
        });
        this.usernameForm = this.formBuilder.group({
            usernameInput: ['', [Validators.required]]
        });
        this.emailForm = this.formBuilder.group({
            emailInput: ['', [Validators.required]]
        });
        this.passwordForm = this.formBuilder.group({
            passwordInput: ['', [Validators.required]]
        });
    }

    get usernameEr() { return this.usernameForm.controls; }
    get emailEr() { return this.emailForm.controls; }
    get passwordEr() { return this.passwordForm.controls; }


    updateUsername() {
        this.usernameSubmitted = true;
        if (this.usernameForm.invalid) {
            return;
        }
        let data = this.usernameForm.value;
        let updatedUser = {newUsername: data.usernameInput, userid: this.user.id}
        this.http.get('http://localhost:3000/user/updateUsername/' + updatedUser).subscribe((res :any) => {
            this.user = res;
        });
    }

    updateEmail() {
        this.usernameSubmitted = true;
        if (this.usernameForm.invalid) {
            return;
        }
        let data = this.usernameForm.value;
        let updatedUser = {newEmail: data.emailInput, userid: this.user.id}
        this.http.get('http://localhost:3000/user/updateEmail/' + updatedUser).subscribe((res :any) => {
            this.user = res;
        });
    }

    updatePassword() {
        this.passwordSubmitted = true;
        if (this.passwordForm.invalid) {
            return;
        }
        let data = this.usernameForm.value;
        let updatedUser = {newPassword: data.passwordInput, userid: this.user.id}
        this.http.get('http://localhost:3000/user/updateEmail/' + updatedUser).subscribe((res :any) => {
            this.user = res;
        });
    }
}