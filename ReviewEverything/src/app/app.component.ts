import { Component, HostListener } from "@angular/core";
import {Router} from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  currentUserId = localStorage.getItem('userId');  
  loginSubmitted = false;
  signupSubmitted = false;
  
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }
  
  loginForm = this.formBuilder.group({
    loginEmail: ['', [Validators.required, Validators.email]],
    loginPassword: ['', [Validators.required, Validators.minLength(6)]],
  })
  signupForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  get loginEr() { return this.loginForm.controls; }
  get signEr() { return this.signupForm.controls; }
  
  public captchaResponse: string = '';
  public resolved(captchaResponse: string) {
    const newResponse = captchaResponse
      ? `${captchaResponse.substr(0, 7)}...${captchaResponse.substr(-7)}`
      : captchaResponse;
    // this.captchaResponse += `${JSON.stringify(newResponse)}\n`;
  }

  onLogin(captcha) {
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
    this.http.post('http://localhost:3000/user', { 'username': this.signupForm.value.username, 'fname': this.signupForm.value.fname, 'lname': this.signupForm.value.lname, 'email': this.signupForm.value.email, 'password': this.signupForm.value.password }).subscribe((res) => {
    })
  }

  onLogout(){
    console.log(this.currentUserId);
    this.loginSubmitted = false;
    this.signupSubmitted = false;
    localStorage.clear();
  }
  title = "ReviewEverything";
  onSearchSubmit(formData) {
    this.router.navigate(['/search', formData.typeOfSearch, formData.movieSearch])
  }

  // When the user clicks anywhere outside of the modal, close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
      if (event.target == document.getElementById('profile_modal')) {
        document.getElementById('profile_modal').style.display = "none";
      }
      if (event.target == document.getElementById('login_modal')) {
        document.getElementById('login_modal').style.display = "none";
      }
      if (event.target == document.getElementById('signup_modal')) {
        document.getElementById('signup_modal').style.display = "none";
      }
  }
}
