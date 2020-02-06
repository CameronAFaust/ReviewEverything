import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
      fname: ['', [Validators.required, Validators.minLength(6)]],
      lname: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      // confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      // validator: 'password' == 'confirmPassword'
    });
  }

  get loginEr() { return this.loginForm.controls; }
  get signEr() { return this.signupForm.controls; }

  onLogin() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.http.get('http://localhost:3000/user/get/' + this.loginForm.value.loginEmail + '/' + this.loginForm.value.loginPassword + '').subscribe((res :any) => {
      localStorage.setItem('userId', res.id);
      localStorage.setItem('username', res.username);
    })
  }

  onSignup(){
    this.signupSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    
    this.http.post('http://localhost:3000/user', { 'fname': this.signupForm.value.fname, 'lname': this.signupForm.value.lname, 'email': this.signupForm.value.email, 'password': this.signupForm.value.password }).subscribe((res) => {
    })
  }

  onLogout(){
    this.loginSubmitted = false;
    this.signupSubmitted = false;
    localStorage.clear();
  }

  onSearchSubmit(formData) {
    this.loginSubmitted = false;
    this.signupSubmitted = false;
    this.router.navigate(['/movie', formData.movieSearch])
  }

}
