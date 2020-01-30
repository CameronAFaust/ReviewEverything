import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginSubmitted = false;
  signupSubmitted = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: 'password' == 'confirmPassword'
    });
  }

  get loginEr() { return this.loginForm.controls; }
  get signEr() { return this.signupForm.controls; }

  onLogin() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    // this.http.get('http://localhost:3000/user/' + this.loginForm.value.email + '/' + this.loginForm.value.password + '').subscribe((res) => {
    //   localStorage.setItem('userId', res.id);
    //   localStorage.setItem('username', res.username);
    //   console.log("done")
    // })
  }

  onSignup(){
    this.signupSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    // console.log(formData);
    // this.http.post('http://localhost:3000/user', { 'fname': formData.fname, 'lname': formData.lname, 'email': formData.email, 'password': formData.password }).subscribe((res) => {
    // })
  }

  onLogout(){
    this.submitted = false;
    // localStorage.clear();
  }

  onSearchSubmit(formData) {
    this.submitted = false;
    console.log(formData.movieSearch);
    this.router.navigate(['/movie', formData.movieSearch])
  }

}
