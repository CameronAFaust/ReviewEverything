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
<<<<<<< HEAD
  forgotSubmitted = false;
  exists = false;
  forgotExists = false;
  passwordCount = 0;
  userId;

=======
  passwordSubmitted;
  user;
  checkUser;
  
>>>>>>> master
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
<<<<<<< HEAD
  forgotForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get loginEr() { return this.loginForm.controls; }
  get signEr() { return this.signupForm.controls; }
  get forgotEr() { return this.forgotForm.controls; }
=======
  passwordForm = this.formBuilder.group({
    passwordInput: ['', [Validators.required]]
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
>>>>>>> master

  onLogin(captcha) {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.http.get('http://localhost:3000/user/getEmail/' + this.loginForm.value.loginEmail).subscribe((res :any) => {
      console.log(res);
      if(res.length > 0) {
        this.forgotExists = true;
        this.userId = res[0].id;
        console.log(res[0].id)
      }
    })

    this.http.get('http://localhost:3000/user/get/' + this.loginForm.value.loginEmail + '/' + this.loginForm.value.loginPassword + '').subscribe((res :any) => {
      console.log(res.is_locked)
      if(res.is_locked != 1) {
        localStorage.setItem('userId', res.id);
        localStorage.setItem('username', res.username);
      };
    })

    if(this.forgotExists = true && localStorage.getItem('userId') == null) {
      this.passwordCount++;
      if(this.passwordCount == 10) {
        this.http.post('http://localhost:3000/sendMail/lockedMail', { 'email': this.forgotForm.value.email, 'id': this.userId }).subscribe((res: any) => {

        });
        this.http.put('http://localhost:3000/user/lockUser', {'id': this.userId}).subscribe((res: any) => {

        });
      }
    }
  }

  onSignup(){
    this.signupSubmitted = true;    
    this.http.post('http://localhost:3000/user', { 'username': this.signupForm.value.username, 'fname': this.signupForm.value.fname, 'lname': this.signupForm.value.lname, 'email': this.signupForm.value.email, 'password': this.signupForm.value.password }).subscribe((res) => {
    })
  }

  onForgotPassword() {
    // document.getElementById('emailNone').style.display = 'none';
    this.forgotSubmitted = true;
    if (this.forgotForm.invalid) {
      return;
    }
    this.http.get('http://localhost:3000/user/getEmail/' + this.forgotForm.value.email).subscribe((res :any) => {
      console.log(res.length);
      if(res.length > 0) {
        this.exists = true;
        this.userId = res[0].id;
        if(res[0].is_locked == 1) {
          return;
        }
      }
    })
    if(this.exists == false) {
      // document.getElementById('emailNone').style.display = 'block';
      return;
    }
    this.http.post('http://localhost:3000/sendMail/passwordMail', { 'email': this.forgotForm.value.email, 'id': this.userId }).subscribe((res: any) => {

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

  updatePassword() {
    this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId).subscribe((res: any) => {
      this.checkUser = res;
      this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId).subscribe((res: any) => {
        this.user = res;
        this.passwordSubmitted = true;
        if (this.passwordForm.invalid) {
          return;
        }
        let data = this.passwordForm.value;
        let updatedUser = { 'password': data.passwordInput, id: this.checkUser[0].id }
        this.http.put('http://localhost:3000/user/', updatedUser).subscribe((res: any) => {
          this.user = res;
        });
      });
    });
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
