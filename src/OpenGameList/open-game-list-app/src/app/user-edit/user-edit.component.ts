import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    title: string = "New User Registration";
    userForm: FormGroup;
    errorMessage: string;
    isRegister: boolean;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {

        // Determine behavior by fetching the active route
        this.isRegister = (activatedRoute.snapshot.url.toString() === 'register');

        if ((this.isRegister && this.authService.isLoggedIn())
            || (!this.isRegister && !this.authService.isLoggedIn())) {
            this.router.navigate(['']);
        }

        if (!this.isRegister) {
            this.title = 'Edit account';
        }
    }

    ngOnInit() {
        this.userForm = this.fb.group({
            'username': ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            'email': ['', [Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$")]],
            'password': ['', [Validators.required, Validators.minLength(6)]],
            'passwordConfirm': ['', [Validators.required, Validators.minLength(6)]],
            'displayName': ['', null]
        },
            {
                validator: this.compareValidator('password', 'passwordConfirm')
            });

        if (!this.isRegister) {
            this.userForm.addControl('passwordCurrent', new FormControl('', Validators.required));

            var password = this.userForm.get('password');
            password.clearValidators();
            password.setValidators(Validators.minLength(6));

            var passwordConfirm =
                this.userForm.get("passwordConfirm");
            passwordConfirm.clearValidators();
            passwordConfirm.setValidators(Validators.minLength(6));

            this.authService.get().subscribe(
                user => {
                    this.userForm.get("username")
                        .setValue(user.UserName);
                    this.userForm.get("email")
                        .setValue(user.Email);
                    this.userForm.get("displayName")
                        .setValue(user.DisplayName);
                }
            );
        }
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
        if (this.isRegister) {
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
        } else {
            let user = new User(
                this.userForm.value.username,
                this.userForm.value.password,
                this.userForm.value.passwordNew,
                this.userForm.value.email,
                this.userForm.value.displayName
            );

            this.authService.update(user)
                .subscribe((data) => {
                    if (data.error == null) {
                        // update successful
                        this.errorMessage = null;
                        this.router.navigate(['']);
                    } else {
                        this.errorMessage = data.error;
                    }
                }, (err) => {
                    // server/connection error
                    this.errorMessage = err;
                });
        }
    }

}
