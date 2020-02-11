import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    reviews;
    usernameForm: FormGroup;
    emailForm: FormGroup;
    passwordForm: FormGroup;
    reviewForm: FormGroup;
    usernameSubmitted = false;
    emailSubmitted = false;
    passwordSubmitted = false;
    currentUserId = localStorage.getItem('userId');
    constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

    ngOnInit() {
        this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId).subscribe((res: any) => {
            this.checkUser = res;
        });
        this.route.paramMap.subscribe(params => {
            this.currentId = this.currentUserId;
            this.paramsId = params.get('userid');
        });
        if (!this.currentUserId) {
            // this.router.navigate(['/']);
        }
        this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId).subscribe((res: any) => {
            this.user = res;
        });
        this.http.get('http://localhost:3000/review/user/' + this.currentUserId).subscribe((res: any) => {
            this.reviews = res;
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
        this.reviewForm = this.formBuilder.group({
            reviewText: new FormControl(),
            reviewTitle: new FormControl(),
            reviewRating: new FormControl()
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
        console.log(this.checkUser)
        let data = this.usernameForm.value;
        let updatedUser = { username: data.usernameInput, email: this.checkUser[0].email, id: this.checkUser[0].id }
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
        let updatedUser = { 'username': this.checkUser[0].username, 'email': data.emailInput, id: this.checkUser[0].id }
        this.http.put('http://localhost:3000/user/password', updatedUser).subscribe((res: any) => {
            this.user = res;
        });
    }

    updatePassword() {
        this.passwordSubmitted = true;
        if (this.passwordForm.invalid) {
            return;
        }
        let data = this.passwordForm.value;
        let updatedUser = { 'password': data.passwordInput, id: this.checkUser[0].id }
        this.http.put('http://localhost:3000/user/', updatedUser).subscribe((res: any) => {
            this.user = res;
        });
    }

    deleteUser() {
        this.http.delete('http://localhost:3000/review/' + this.paramsId).subscribe((res) => {
            this.http.delete('http://localhost:3000/user/' + this.paramsId).subscribe((res) => {

            })
        })
    }

    updateReview(review) {
        console.log(review);
        let data = this.reviewForm.value;
        if(data.reviewText == null){
            data.reviewText = review.review_text;
        }
        if(data.reviewTitle == null){
            data.reviewTitle = review.review_title;
        }
        if(data.reviewRating == null){
            data.reviewRating = review.rating;
        }
        this.http.put('http://localhost:3000/review', { 'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': review.movie_id, 'rating': data.reviewRating, 'reviewID': review.id }).subscribe((res) => {
            this.http.get('http://localhost:3000/review/user/' + this.currentUserId).subscribe((res: any) => {
                this.reviews = res;
            });
        })
    }

}