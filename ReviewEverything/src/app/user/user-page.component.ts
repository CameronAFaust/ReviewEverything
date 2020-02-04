import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) document) { }

    ngOnInit() {
        
    }

    deleteReview(data) {
      this.http.delete('http://localhost:3000/user/' + data.id + '').subscribe((res) => {
  
      })
    }
}