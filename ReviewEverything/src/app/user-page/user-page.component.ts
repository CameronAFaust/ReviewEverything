import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
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
    checkUser;
    currentId;
    paramsId;
    usernameForm: FormGroup;
    emailForm: FormGroup;
    passwordForm: FormGroup;
    usernameSubmitted = false;
    emailSubmitted = false;
    passwordSubmitted = false;
    currentUserId = localStorage.getItem('userId');
    constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

    ngOnInit() {
        this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId).subscribe((res: any) => {
            this.checkUser = res;
        });
        this.route.paramMap.subscribe(params => {
            this.currentId = this.currentUserId;
            this.paramsId = params.get('userid')

        });
        if (!this.currentUserId) {

        }
        else {
            this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId).subscribe((res: any) => {
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
        let updatedUser = { username: data.usernameInput, userid: this.user.id }
        this.http.put('http://localhost:3000/user/', updatedUser).subscribe((res: any) => {
            this.user = res;
        });
    }

    updateEmail() {
        this.usernameSubmitted = true;
        if (this.usernameForm.invalid) {
            return;
        }
        let data = this.emailForm.value;
        let updatedUser = { email: data.emailInput, userid: this.user.id }
        this.http.put('http://localhost:3000/user/', updatedUser).subscribe((res: any) => {
            this.user = res;
        });
    }

    updatePassword() {
        this.passwordSubmitted = true;
        if (this.passwordForm.invalid) {
            return;
        }
        let data = this.passwordForm.value;
        let updatedUser = { password: data.passwordInput, userid: this.user.id }
        this.http.put('http://localhost:3000/user/', updatedUser).subscribe((res: any) => {
            this.user = res;
        });
    }

    deleteUser() {
        this.http.delete('http://localhost:3000/user/' + this.currentUserId + '').subscribe((res) => {

        })
    }
}