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
    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    ngOnInit() {
        if (!this.currentUserId) {
            // route away or to a login
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
        let updatedUser = {newUsername: data.usernameInput, userid: user.id}
        this.http.get('http://localhost:3000/user/updateUsername/' + this.updatedUser).subscribe((res :any) => {
            this.user = res;
        });
    }

    updateEmail() {
        this.usernameSubmitted = true;
        if (this.usernameForm.invalid) {
            return;
        }
        let updatedUser = {newEmail: data.emailInput, userid: user.id}
        this.http.get('http://localhost:3000/user/updateEmail/' + this.updatedUser).subscribe((res :any) => {
            this.user = res;
        });
    }

    updatePassword() {
        this.passwordSubmitted = true;
        if (this.passwordForm.invalid) {
            return;
        }
        let updatedUser = {newPassword: data.passwordInput, userid: user.id}
        this.http.get('http://localhost:3000/user/updateEmail/' + this.updatedUser).subscribe((res :any) => {
            this.user = res;
        });
    }
}