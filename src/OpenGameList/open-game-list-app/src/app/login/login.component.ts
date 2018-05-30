import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    title: string = "Login";
    loginForm = null;

    constructor(
        private fb: FormBuilder,
        private router: Router) {
        this.loginForm = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    performLogin(e) {
        e.preventDefault();
        alert(JSON.stringify(this.loginForm.value));
    }

    ngOnInit() {
    }

}
