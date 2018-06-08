import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    userForm: FormGroup;
    errorMessage: string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['']);
        }
    }

    ngOnInit() {
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'* +/=?^_`{|}~-]+(?:\.[az0-9!#$ %&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[az0-9](?:[a - z0 - 9 -]* [a - z0 - 9]) ?")]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
            displayName: ['', null]
        },
        {
            validator: this.compareValidator('password', 'passwordConfirm')
        });
    }

    compareValidator(fc1: string, fc2: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[fc1];
            let passwordConfirm = group.controls[fc2];

            if (password.value === passwordConfirm.value) {
                return null;
            }

            return {
                compareFailed: true
            };
        };
    }

    onSubmit() {
        this.authService.add(this.userForm.value)
            .subscribe((data) => {
                if (data.error == null) {
                    // registration successful
                    this.errorMessage = null;
                    this.authService.login(this.userForm.value.username, this.userForm.value.password)
                        .subscribe((data) => {
                            // login successful
                            this.errorMessage = null;
                            this.router.navigate(['']);
                        }, (err) => {
                            console.log(err);
                            // login failure
                            this.errorMessage = "Warning: Username or Password mismatch"
                        });
                } else {
                    // registration failure
                    this.errorMessage = data.error;
                }
            }, (err) => {
                // server/connection error
                this.errorMessage = err;
            });
    }

}
