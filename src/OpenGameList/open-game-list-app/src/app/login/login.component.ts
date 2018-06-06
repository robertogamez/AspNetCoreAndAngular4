import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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
    loginError: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {

        if (this.authService.isLoggedIn()) {
            this.router.navigate(['']);
        }

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

            var username = this.loginForm.value.username;
            var password = this.loginForm.value.password;

            this.authService.login(username, password)
                .subscribe((data) => {
                    // Login successful
                    this.loginError = false;
                    var auth = this.authService.getAuth();
                    alert('Out token is: ' + auth.access_token);
                    this.router.navigate(['']);
                },
                (err) => {
                    console.log(err);
                    // Login failure
                    this.loginError = true;
                });
        }
    }

    ngOnInit() {
    }

}
