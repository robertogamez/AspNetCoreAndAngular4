import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    title: string = "Login";
    loginForm: FormGroup;
    username: AbstractControl;
    password: AbstractControl;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {

        this.loginForm = fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });

        this.username = this.loginForm.controls['username'];
        this.password = this.loginForm.controls['password'];
    }

    performLogin() {
        //e.preventDefault();
        if (this.loginForm.valid) {
            alert(JSON.stringify(this.loginForm.value));
        }
    }

    ngOnInit() {
    }

}
