webpackJsonp([1,4],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = (function () {
    function AboutComponent() {
        this.title = 'About';
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-about',
        template: __webpack_require__(321),
        styles: [__webpack_require__(311)]
    }),
    __metadata("design:paramtypes", [])
], AboutComponent);

//# sourceMappingURL=about.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
        this.title = "Welcome View";
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'home',
        template: __webpack_require__(323),
        styles: [__webpack_require__(312)]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__item_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ItemDetailEditComponent = (function () {
    function ItemDetailEditComponent(itemService, router, activatedRoute, authService) {
        this.itemService = itemService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
    }
    ItemDetailEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['']);
        }
        var id = this.activatedRoute.snapshot.params['id'];
        if (id > 0) {
            this.itemService.get(id).subscribe(function (item) { return _this.item = item; });
            console.log(this.item);
        }
        else if (id == 0) {
            console.log('Id is 0: adding a new item...');
            this.item = new __WEBPACK_IMPORTED_MODULE_2__item__["a" /* Item */](0, "New Item", null);
        }
        else {
            console.log('Invalid id: routing back to home...');
            this.router.navigate(['']);
        }
    };
    ItemDetailEditComponent.prototype.onInsert = function (item) {
        var _this = this;
        this.itemService.add(item).subscribe(function (data) {
            _this.item = data;
            console.log("Item " + _this.item.Id + " has been added.");
            _this.router.navigate(['']);
        });
    };
    ItemDetailEditComponent.prototype.onBack = function () {
        this.router.navigate(['']);
    };
    ItemDetailEditComponent.prototype.onUpdate = function (item) {
        var _this = this;
        this.itemService.update(item).subscribe(function (data) {
            _this.item = data;
            console.log('Item ' + _this.item.Id + ' has been updated.');
            _this.router.navigate(['item/view', _this.item.Id]);
        }, function (error) { return console.log(error); });
    };
    ItemDetailEditComponent.prototype.onDelete = function (item) {
        var _this = this;
        var id = item.Id;
        this.itemService.delete(id).subscribe(function (data) {
            console.log('Item ' + id + ' has been deleted.');
            _this.router.navigate(['']);
        }, function (error) { return console.log(error); });
    };
    ItemDetailEditComponent.prototype.onItemDetailView = function (item) {
        this.router.navigate(['item/view', item.Id]);
    };
    return ItemDetailEditComponent;
}());
ItemDetailEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'item-detail-edit',
        template: __webpack_require__(324),
        styles: [__webpack_require__(313)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__item_service__["a" /* ItemService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */]) === "function" && _d || Object])
], ItemDetailEditComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=item-detail-edit.component.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ItemDetailViewComponent = (function () {
    function ItemDetailViewComponent(authService, itemService, router, activatedRoute) {
        this.authService = authService;
        this.itemService = itemService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    ItemDetailViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.activatedRoute.snapshot.params['id'];
        if (id > 0) {
            this.itemService.get(id).subscribe(function (item) { return _this.item = item; });
        }
        else if (id === 0) {
            console.log('id is 0: switching to edit mode...');
            this.router.navigate(['item/edit', 0]);
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate(['']);
        }
    };
    ItemDetailViewComponent.prototype.onItemDetailEdit = function (item) {
        this.router.navigate(['item/edit', item.Id]);
        return false;
    };
    ItemDetailViewComponent.prototype.onBack = function () {
        this.router.navigate(['']);
    };
    return ItemDetailViewComponent;
}());
ItemDetailViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-item-detail-view',
        template: __webpack_require__(325),
        styles: [__webpack_require__(314)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], ItemDetailViewComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=item-detail-view.component.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(fb, router, authService) {
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.title = "Login";
        this.loginError = false;
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['']);
        }
        this.loginForm = fb.group({
            'username': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'password': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
        });
        this.username = this.loginForm.controls['username'];
        this.password = this.loginForm.controls['password'];
    }
    LoginComponent.prototype.performLogin = function () {
        var _this = this;
        //e.preventDefault();
        if (this.loginForm.valid) {
            alert(JSON.stringify(this.loginForm.value));
            var username = this.loginForm.value.username;
            var password = this.loginForm.value.password;
            this.authService.login(username, password)
                .subscribe(function (data) {
                // Login successful
                _this.loginError = false;
                var auth = _this.authService.getAuth();
                alert('Out token is: ' + auth.access_token);
                _this.router.navigate(['']);
            }, function (err) {
                console.log(err);
                // Login failure
                _this.loginError = true;
            });
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onRegister = function () {
        this.router.navigate(['register']);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__(327),
        styles: [__webpack_require__(316)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
        this.title = "Page not found";
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-page-not-found',
        template: __webpack_require__(328),
        styles: [__webpack_require__(317)]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);

//# sourceMappingURL=page-not-found.component.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(255);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserEditComponent = (function () {
    function UserEditComponent(fb, router, authService, activatedRoute) {
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.title = "New User Registration";
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
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.fb.group({
            'username': ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].pattern('[a-zA-Z0-9]+')]],
            'email': ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$")]],
            'password': ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(6)]],
            'passwordConfirm': ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(6)]],
            'displayName': ['', null]
        }, {
            validator: this.compareValidator('password', 'passwordConfirm')
        });
        if (!this.isRegister) {
            this.userForm.addControl('passwordCurrent', new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required));
            var password = this.userForm.get('password');
            password.clearValidators();
            password.setValidators(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(6));
            var passwordConfirm = this.userForm.get("passwordConfirm");
            passwordConfirm.clearValidators();
            passwordConfirm.setValidators(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(6));
            this.authService.get().subscribe(function (user) {
                _this.userForm.get("username")
                    .setValue(user.UserName);
                _this.userForm.get("email")
                    .setValue(user.Email);
                _this.userForm.get("displayName")
                    .setValue(user.DisplayName);
            });
        }
    };
    UserEditComponent.prototype.compareValidator = function (fc1, fc2) {
        return function (group) {
            var password = group.controls[fc1];
            var passwordConfirm = group.controls[fc2];
            if (password.value === passwordConfirm.value) {
                return null;
            }
            return {
                compareFailed: true
            };
        };
    };
    UserEditComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.isRegister) {
            this.authService.add(this.userForm.value)
                .subscribe(function (data) {
                if (data.error == null) {
                    // registration successful
                    _this.errorMessage = null;
                    _this.authService.login(_this.userForm.value.username, _this.userForm.value.password)
                        .subscribe(function (data) {
                        // login successful
                        _this.errorMessage = null;
                        _this.router.navigate(['']);
                    }, function (err) {
                        console.log(err);
                        // login failure
                        _this.errorMessage = "Warning: Username or Password mismatch";
                    });
                }
                else {
                    // registration failure
                    _this.errorMessage = data.error;
                }
            }, function (err) {
                // server/connection error
                _this.errorMessage = err;
            });
        }
        else {
            var user = new __WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* User */](this.userForm.value.username, this.userForm.value.password, this.userForm.value.passwordNew, this.userForm.value.email, this.userForm.value.displayName);
            this.authService.update(user)
                .subscribe(function (data) {
                if (data.error == null) {
                    // update successful
                    _this.errorMessage = null;
                    _this.router.navigate(['']);
                }
                else {
                    _this.errorMessage = data.error;
                }
            }, function (err) {
                // server/connection error
                _this.errorMessage = err;
            });
        }
    };
    return UserEditComponent;
}());
UserEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-user-edit',
        template: __webpack_require__(329),
        styles: [__webpack_require__(318)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], UserEditComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=user-edit.component.js.map

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 243;


/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(256);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.title = "OpenGameList";
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.isActive = function (data) {
        return this
            .router
            .isActive(this.router.createUrlTree(data), true);
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.authService.logout().subscribe(function (result) {
            if (result) {
                _this.router.navigate(['']);
            }
        });
        return false;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'opengamelist',
        template: __webpack_require__(322),
        styles: [__webpack_require__(319)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_RX__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_RX___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_RX__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__item_list_item_list_component__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__item_detail_edit_item_detail_edit_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__item_detail_view_item_detail_view_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__about_about_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_not_found_page_not_found_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_home_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__route_route_module__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__item_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__auth_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__auth_auth_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__user_edit_user_edit_component__ = __webpack_require__(116);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















// Route

// Services




var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__item_list_item_list_component__["a" /* ItemListComponent */],
            __WEBPACK_IMPORTED_MODULE_9__item_detail_edit_item_detail_edit_component__["a" /* ItemDetailEditComponent */],
            __WEBPACK_IMPORTED_MODULE_10__item_detail_view_item_detail_view_component__["a" /* ItemDetailViewComponent */],
            __WEBPACK_IMPORTED_MODULE_11__about_about_component__["a" /* AboutComponent */],
            __WEBPACK_IMPORTED_MODULE_12__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_13__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_14__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_10__item_detail_view_item_detail_view_component__["a" /* ItemDetailViewComponent */],
            __WEBPACK_IMPORTED_MODULE_19__user_edit_user_edit_component__["a" /* UserEditComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_15__route_route_module__["a" /* AppRouting */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__item_service__["a" /* ItemService */],
            __WEBPACK_IMPORTED_MODULE_17__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_18__auth_auth_http__["a" /* AuthHttp */],
            { provide: __WEBPACK_IMPORTED_MODULE_5__angular_common__["a" /* LocationStrategy */], useClass: __WEBPACK_IMPORTED_MODULE_5__angular_common__["b" /* HashLocationStrategy */] }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ItemListComponent = (function () {
    function ItemListComponent(itemService, router) {
        this.itemService = itemService;
        this.router = router;
    }
    ItemListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ItemListComponent instantiated with the following type: " + this.class);
        var s = null;
        switch (this.class) {
            case "latest":
                this.title = 'Latest Items';
                s = this.itemService.getLatest();
                break;
            case "most-viewed":
                this.title = 'Most Viewed Items';
                s = this.itemService.getMostViewed();
                break;
            case "random":
                this.title = "Random Items";
                s = this.itemService.getRandom();
                break;
        }
        s.subscribe(function (items) { return _this.items = items; }, function (error) { return _this.errorMessage = error; });
        //this.getLatest();
    };
    ItemListComponent.prototype.getLatest = function () {
        var _this = this;
        this.itemService.getLatest()
            .subscribe(function (latestItems) {
            console.log(latestItems);
            _this.items = latestItems;
        }, function (error) { return _this.errorMessage = error; });
    };
    ItemListComponent.prototype.onSelect = function (item) {
        this.selectedItem = item;
        console.log("item with id " + this.selectedItem.Id + " has been selected. Loading item viewer...");
        this.router.navigate(['item/view', this.selectedItem.Id]);
    };
    return ItemListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Input */])(),
    __metadata("design:type", String)
], ItemListComponent.prototype, "class", void 0);
ItemListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'item-list',
        template: __webpack_require__(326),
        styles: [__webpack_require__(315)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], ItemListComponent);

var _a, _b;
//# sourceMappingURL=item-list.component.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
var Item = (function () {
    function Item(Id, Title, Description) {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
    }
    return Item;
}());

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_not_found_page_not_found_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__item_detail_edit_item_detail_edit_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__item_detail_view_item_detail_view_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_edit_user_edit_component__ = __webpack_require__(116);
/* unused harmony export AppRoutingProviders */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRouting; });








var appRoutes = [
    {
        path: "",
        component: __WEBPACK_IMPORTED_MODULE_1__home_home_component__["a" /* HomeComponent */]
    },
    {
        path: "home",
        redirectTo: ""
    },
    {
        path: "about",
        component: __WEBPACK_IMPORTED_MODULE_2__about_about_component__["a" /* AboutComponent */]
    },
    {
        path: "login",
        component: __WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'item/edit/:id',
        component: __WEBPACK_IMPORTED_MODULE_5__item_detail_edit_item_detail_edit_component__["a" /* ItemDetailEditComponent */]
    }, {
        path: 'item/view/:id',
        component: __WEBPACK_IMPORTED_MODULE_6__item_detail_view_item_detail_view_component__["a" /* ItemDetailViewComponent */]
    },
    {
        path: 'register',
        component: __WEBPACK_IMPORTED_MODULE_7__user_edit_user_edit_component__["a" /* UserEditComponent */]
    },
    {
        path: 'account',
        component: __WEBPACK_IMPORTED_MODULE_7__user_edit_user_edit_component__["a" /* UserEditComponent */]
    },
    {
        path: "**",
        component: __WEBPACK_IMPORTED_MODULE_4__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */]
    }
];
var AppRoutingProviders = [];
var AppRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=route.module.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(UserName, Password, PasswordNew, Email, DisplayName) {
        this.UserName = UserName;
        this.Password = Password;
        this.PasswordNew = PasswordNew;
        this.Email = Email;
        this.DisplayName = DisplayName;
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.authKey = "auth";
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var url = 'api/connect/token';
        var data = {
            username: username,
            password: password,
            client_id: "OpenGameList",
            grant_type: "password",
            scope: "offline_access profile email"
        };
        return this.http.post(url, this.toUrlEncodedString(data), new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })).map(function (response) {
            var auth = response.json();
            console.log('The following aut JSON object has been received: ');
            console.log(auth);
            _this.setAuth(auth);
            return auth;
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return this.http.post('api/accounts/logout', null)
            .map(function (response) {
            _this.setAuth(null);
            return true;
        })
            .catch(function (err) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(err);
        });
    };
    // Converts a JSON Object to urlencoded format
    AuthService.prototype.toUrlEncodedString = function (data) {
        var body = '';
        for (var key in data) {
            if (body.length) {
                body += '&';
            }
            body += key + '=';
            body += encodeURIComponent(data[key]);
        }
        return body;
    };
    // Persists auth info into localStorage or removes it if a NULL argument is given
    AuthService.prototype.setAuth = function (auth) {
        if (auth) {
            localStorage.setItem(this.authKey, JSON.stringify(auth));
        }
        else {
            localStorage.removeItem(this.authKey);
        }
        return true;
    };
    // Retrieves the auth JSON object (or NULL if none)
    AuthService.prototype.getAuth = function () {
        var i = localStorage.getItem(this.authKey);
        if (i) {
            return JSON.parse(i);
        }
        else {
            return null;
        }
    };
    // Returns TRUE if the user is logged in, FALSE otherwise
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem(this.authKey) != null;
    };
    AuthService.prototype.get = function () {
        return this.http.get('/api/accounts')
            .map(function (response) { return response.json(); });
    };
    AuthService.prototype.add = function (user) {
        return this.http.post('/api/accounts', JSON.stringify(user), new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
                'Content-Type': 'application/json'
            })
        })).map(function (response) { return response.json(); });
    };
    AuthService.prototype.update = function (user) {
        return this.http.put('api/accounts', JSON.stringify(user), new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
                'Content-Type': 'application/json'
            })
        })).map(function (response) { return response.json(); });
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_http__["a" /* AuthHttp */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_http__["a" /* AuthHttp */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 321:
/***/ (function(module, exports) {

module.exports = "<h2>{{title}}</h2>\r\n<div>\r\n    OpenGameList: a production-ready, fully-featured SPA sample powered by ASP.NET Core Web API and Angular 4\r\n</div>"

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse navbar-fixed-top\">\r\n    <div class=\"container-fluid\">\r\n        <input type=\"checkbox\" id=\"navbar-toggle-cbox\" />\r\n        <div class=\"navbar-header\">\r\n            <label for=\"navbar-toggle-cbox\" class=\"navbar-toggle collapsed\"\r\n                   data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\r\n                   aria-controls=\"navbar\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </label>\r\n            <a class=\"navbar-brand\" href=\"#\">\r\n                <img alt=\"logo\" src=\"../assets/img/logo.svg\" />\r\n            </a>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\" id=\"navbar\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li [class.active]=\"isActive([''])\">\r\n                    <a class=\"home\"  \r\n                       [routerLink]=\"['']\">Home</a>\r\n                </li>\r\n                <li [class.active]=\"isActive(['about'])\">\r\n                    <a class=\"about\" \r\n                       [routerLink]=\"['about']\">About</a>\r\n                </li>\r\n                <li [class.active]=\"isActive(['item/edit', 0])\"\r\n                    *ngIf=\"authService.isLoggedIn()\"\r\n                    class=\"right\">\r\n                    <a class=\"add\"\r\n                       [routerLink]=\"['item/edit', 0]\">Add New</a>\r\n                </li>\r\n                <li [class.active]=\"isActive(['login']) || isActive(['register'])\"\r\n                    *ngIf=\"!authService.isLoggedIn()\"\r\n                    class=\"right\">\r\n                    <a class=\"login\" \r\n                       [routerLink]=\"['login']\">Login / Register</a>\r\n                </li>\r\n                <li *ngIf=\"authService.isLoggedIn()\" class=\"right\">\r\n                    <a class=\"logout\" href=\"javascript:void(0)\"\r\n                       (click)=\"logout()\">Logout</a>\r\n                </li>\r\n                <li *ngIf=\"authService.isLoggedIn()\" \r\n                    class=\"right\"\r\n                    [class.active]=\"isActive(['account'])\">\r\n                    <a [routerLink]=\"['account']\">Edit Acount</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<h1 class=\"header\">{{title}}</h1>\r\n<div class=\"main-container\">\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 323:
/***/ (function(module, exports) {

module.exports = "<h2>\r\n    A non-comprehensive directory of open-source video games\r\n    available on the web\r\n</h2>\r\n<div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n        <item-list class=\"latest\"></item-list>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n        <item-list class=\"most-viewed\"></item-list>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n        <item-list class=\"random\"></item-list>\r\n    </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ 324:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"item\">\r\n    <h2>\r\n        <a href=\"#\" (click)=\"onBack()\">\r\n            &laquo; Back to Home\r\n        </a>\r\n    </h2>\r\n    <div class=\"item-container\">\r\n        <ul class=\"nav nav-tabs\">\r\n            <li role=\"presentation\" class=\"active\">\r\n                <a href=\"#\">Edit</a>\r\n            </li>\r\n            <li role=\"presentation\" *ngIf=\"item.Id != 0\">\r\n                <a href=\"#\" (click)=\"onItemDetailView(item)\">View</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-body\">\r\n               <form class=\"item-detail-edit\">\r\n                   <h3>\r\n                       {{item.Title}}\r\n                       <span class=\"empty-field\" [hidden]=\"dTitle.valid\">\r\n                           Empty Title\r\n                       </span>\r\n                   </h3>\r\n                   <div class=\"form-group has-feedback\" \r\n                        [ngClass]=\"{ 'has-success': dTitle.valid, 'has-error': !dTitle.valid }\">\r\n                       <label for=\"input-title\">Title</label>\r\n                       <input id=\"input-title\" name=\"input-title\"\r\n                              type=\"text\" class=\"form-control\"\r\n                              [(ngModel)]=\"item.Title\"\r\n                              placeholder=\"Insert the title...\"\r\n                              required #dTitle=\"ngModel\" />\r\n                       <span class=\"glyphicon form-control-feedback\" aria-hidden=\"true\"\r\n                             [ngClass]=\"{'glyphicon-ok': dTitle.valid, 'glyphicon-remove': !dTitle.valid}\"></span>\r\n                       <div [hidden]=\"dTitle.valid\" class=\"alert alert-danger\">\r\n                           You need to enter a valid Title.\r\n                       </div>\r\n                   </div>\r\n                   <div class=\"form-group\">\r\n                       <label for=\"input-description\">Description</label>\r\n                       <textarea id=\"input-description\" name=\"input-description\"\r\n                                 class=\"form-control\" [(ngModel)]=\"item.Description\"\r\n                                 placeholder=\"Insert a suitable description...\" required></textarea>\r\n                   </div>\r\n                   <div class=\"form-group\">\r\n                       <label for=\"input-text\">\r\n                           Text\r\n                       </label>\r\n                       <textarea id=\"input-text\" name=\"input-text\"\r\n                                 class=\"form-control\" [(ngModel)]=\"item.Text\"\r\n                                 placeholder=\"Insert a suitable description...\"></textarea>\r\n                   </div>\r\n                   <div *ngIf=\"item.Id == 0\" class=\"commands insert\">\r\n                       <input type=\"button\" class=\"btn btn-primary\"\r\n                              value=\"Save\" (click)=\"onInsert(item)\" />\r\n                       <input type=\"button\" class=\"btn btn-default\"\r\n                              value=\"Cancel\" (click)=\"onBack()\" />\r\n                   </div>\r\n                   <div *ngIf=\"item.Id != 0\" class=\"commands update\">\r\n                       <input type=\"button\" class=\"btn btn-primary\"\r\n                              value=\"Update\" (click)=\"onUpdate(item)\" />\r\n                       <input type=\"button\" class=\"btn btn-danger\"\r\n                              value=\"Delete\" (click)=\"onDelete(item)\" />\r\n                       <input type=\"button\" class=\"btn btn-default\"\r\n                              value=\"Cancel\" (click)=\"onItemDetailView(item)\" />\r\n                   </div>\r\n               </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 325:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"item\">\r\n    <h2>\r\n        <a href=\"#\" (click)=\"onBack()\">&laquo; Back to Home</a>\r\n    </h2>\r\n    <div class=\"item-container\">\r\n        <ul class=\"nav nav-tabs\">\r\n            <li role=\"presentation\" *ngIf=\"authService.isLoggedIn()\">\r\n                <a href=\"#\" (click)=\"onItemDetailEdit(item)\">Edit</a>\r\n            </li>\r\n            <li role=\"presentation\" class=\"active\">\r\n                <a href=\"#\">View</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"item-page-panel\">\r\n                    <img src=\"/assets/img/item-image-sample.png\" alt=\"{{item.Title}}\" />\r\n                    <div class=\"caption\">Sample image with caption.</div>\r\n                </div>\r\n                <h3>{{item.Title}}</h3>\r\n                <p>{{item.Description}}</p>\r\n                <p>{{item.Text}}</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 326:
/***/ (function(module, exports) {

module.exports = "<h3 class=\"item-list-title\">\r\n    {{title}}\r\n</h3>\r\n<ul class=\"items\">\r\n    <li *ngFor=\"let item of items\"\r\n        [class.selected]=\"item === selectedItem\"\r\n        (click)=\"onSelect(item)\">\r\n        <div class=\"title\">{{item.Title}}</div>\r\n        <div class=\"description\">{{item.Description}}</div>\r\n    </li>\r\n</ul>"

/***/ }),

/***/ 327:
/***/ (function(module, exports) {

module.exports = "<div class=\"login-container\">\r\n    <h2 class=\"form-login-heading\">Login</h2>\r\n    <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"loginError\">\r\n        <strong>Warning</strong> Username or Password mismatch\r\n    </div>\r\n    <form class=\"form-login\" [formGroup]=\"loginForm\" (ngSubmit)=\"performLogin()\">\r\n        <input [formControl]=\"username\" type=\"text\" class=\"form-control\"\r\n               placeholder=\"Your username or email address\"\r\n               autofocus />\r\n        <!--<div *ngIf=\"!username.valid\" class=\"error message\">\r\n            Username is invalid.\r\n        </div>\r\n        <div *ngIf=\"username.hasError('required')\" class=\"error message\">\r\n            Username is required.\r\n        </div>-->\r\n        <input [formControl]=\"password\" type=\"password\" class=\"form-control\"\r\n               placeholder=\"Your password\" />\r\n        <div class=\"checkbox\">\r\n            <label>\r\n                <input type=\"checkbox\" value=\"remember-me\" />\r\n                Remember me\r\n            </label>\r\n        </div>\r\n        <div class=\"register-link\">\r\n            Don't have an account yet?\r\n            <a (click)=\"onRegister()\">Click here to register</a>\r\n        </div>\r\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">\r\n            Sign in\r\n        </button>\r\n    </form>\r\n</div>"

/***/ }),

/***/ 328:
/***/ (function(module, exports) {

module.exports = "<h2>{{title}}</h2>\r\n<div>\r\n    Oops.. This page does not exist (yet!).\r\n</div>"

/***/ }),

/***/ 329:
/***/ (function(module, exports) {

module.exports = "<div class=\"user-container\">\r\n    <form class=\"form-user\" [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\r\n\r\n        <h2 class=\"form-user-heading\">\r\n            {{title}}\r\n        </h2>\r\n        <!--Username-->\r\n        <div class=\"form-group\">\r\n            <input [formControl]=\"userForm.controls.username\" type=\"text\"\r\n                   class=\"form-control\"\r\n                   placeholder=\"Choose an Username\"\r\n                   autofocus />\r\n            <span class=\"validator-label valid\"\r\n                  *ngIf=\"userForm.controls.username.valid\">\r\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span> valid!\r\n            </span>\r\n            <span class=\"validator-label invalid\"\r\n                  *ngIf=\"!userForm.controls.username.valid && !userForm.controls.username.pristine\">\r\n                <span class=\"glyphicon glyphicon-remove\" ariahidden=\"true\"></span> invalid\r\n            </span>\r\n        </div>\r\n        <!--Email-->\r\n        <div class=\"form-group\">\r\n            <input [formControl]=\"userForm.controls.email\" type=\"text\"\r\n                   class=\"form-control\"\r\n                   placeholder=\"Type your e-mail address\" />\r\n            <span class=\"validator-label valid\"\r\n                  *ngIf=\"userForm.controls.email.valid\">\r\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span> valid!\r\n            </span>\r\n            <span class=\"validator-label invalid\"\r\n                  *ngIf=\"!this.userForm.controls.email.valid && !this.userForm.controls.email.pristine\">\r\n                <span class=\"glyphicon glyphicon-remove\" ariahidden=\"true\"></span> invalid\r\n            </span>\r\n        </div>\r\n        <!--Password current-->\r\n        <div class=\"form-group\" *ngIf=\"!this.isRegister\">\r\n            <input [formControl]=\"userForm.controls.passwordCurrent\" type=\"password\"\r\n                   class=\"form-control\"\r\n                   placeholder=\"Current Password\" />\r\n            <span class=\"validator-label invalid\"\r\n                  *ngIf=\"!userForm.controls.passwordCurrent.valid\">\r\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\r\n                required\r\n            </span>\r\n        </div>\r\n        <!--Password-->\r\n        <div class=\"form-group\">\r\n\r\n            <input [formControl]=\"userForm.controls.password\" type=\"password\"\r\n                   class=\"form-control\"\r\n                   placeholder=\"Choose a Password\" />\r\n            <span class=\"validator-label valid\"\r\n                  *ngIf=\"userForm.controls.password.valid\">\r\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span> valid!\r\n            </span>\r\n            <span class=\"validator-label invalid\"\r\n                  *ngIf=\"!userForm.controls.password.valid && !userForm.controls.password.pristine\">\r\n                <span class=\"glyphicon glyphicon-remove\" ariahidden=\"true\"></span> invalid\r\n            </span>\r\n        </div>\r\n        <!--Password confirm-->\r\n        <div class=\"form-group\">\r\n            <input [formControl]=\"userForm.controls.passwordConfirm\" \r\n                   type=\"password\"\r\n                   class=\"form-control\"\r\n                   placeholder=\"Confirm your Password\"\r\n                   [disabled]=\"!isRegister\" />\r\n            <span class=\"validator-label valid\"\r\n                  *ngIf=\"userForm.controls.passwordConfirm.valid\r\n                         && !userForm.controls.password.pristine \r\n                         && !userForm.hasError('compareField')\">\r\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span> valid!\r\n            </span>\r\n            <span class=\"validator-label invalid\"\r\n                  *ngIf=\"(!userForm.controls.passwordConfirm.valid && !userForm.controls.password.pristine)\r\n                            || userForm.hasError('compareField')\">\r\n                <span class=\"glyphicon glyphicon-remove\" ariahidden=\"true\"></span> invalid\r\n            </span>\r\n        </div>\r\n        <!--Display Name-->\r\n        <div class=\"form-group\">\r\n            <input [formControl]=\"userForm.controls.displayName\"\r\n                   type=\"text\" class=\"form-control\"\r\n                   placeholder=\"Choose a Display Name\" />\r\n        </div>\r\n\r\n        <!--Buttons-->\r\n        <div class=\"form-group\">\r\n            <input type=\"submit\" class=\"btn  btn-primary btn-block\" \r\n                   [disabled]=\"!userForm-valid\"\r\n                   value=\"{{isRegister ? 'Register' : 'Save'}}\" />\r\n\r\n        </div>\r\n\r\n    </form>\r\n</div>"

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_auth_http__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ItemService = (function () {
    function ItemService(http) {
        this.http = http;
        this.baseUrl = "api/items/"; // Web api URL
    }
    // calls [GET] /api/items/GetLatest/{n} Web Api method to retrieve the latest items.
    ItemService.prototype.getLatest = function (num) {
        var url = this.baseUrl + "GetLatest";
        if (num != null) {
            url += num;
        }
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // calls the [GET] /api/items/GetMostViewed/{n} Web API method to retrieve the most viewed items.
    ItemService.prototype.getMostViewed = function (num) {
        var url = this.baseUrl + "GetMostViewed/";
        if (num != null) {
            url += num;
        }
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // calls the [GET] /api/items/GetRandom/{n} Web API method to retrieve n random items.
    ItemService.prototype.getRandom = function (num) {
        var url = this.baseUrl + "GetRandom/";
        if (num != null) {
            url += num;
        }
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // calls the [GET] /api/items/{id} Web API method to retrieve the with the given id.
    ItemService.prototype.get = function (id) {
        if (id == null) {
            throw new Error("id is required.");
        }
        var url = this.baseUrl + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // calls the [POST] /api/items/ Web API method to add a new item
    ItemService.prototype.add = function (item) {
        var url = this.baseUrl;
        return this.http.post(url, JSON.stringify(item), this.getRequestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // calls the [PUT] /api/items/{id} Web API method to update an existing item
    ItemService.prototype.update = function (item) {
        var url = this.baseUrl + item.Id;
        return this.http.put(url, JSON.stringify(item), this.getRequestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // calls the [DELETE] /api/items/{id} Web API method to delete the item with thr given id
    ItemService.prototype.delete = function (id) {
        var url = this.baseUrl + id;
        return this.http.delete(url)
            .catch(this.handleError);
    };
    // Returns a viable RequestOptions object to handle Json Request
    ItemService.prototype.getRequestOptions = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
                "Content-Type": "application/json"
            })
        });
    };
    ItemService.prototype.handleError = function (error) {
        // output errors to the console.
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || "Server error");
    };
    return ItemService;
}());
ItemService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__auth_auth_http__["a" /* AuthHttp */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__auth_auth_http__["a" /* AuthHttp */]) === "function" && _a || Object])
], ItemService);

var _a;
//# sourceMappingURL=item.service.js.map

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(244);


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthHttp; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthHttp = (function () {
    function AuthHttp(http) {
        this.authKey = "auth";
        this.http = http;
    }
    AuthHttp.prototype.get = function (url, opts) {
        if (opts === void 0) { opts = {}; }
        this.configureAuth(opts);
        return this.http.get(url, opts);
    };
    AuthHttp.prototype.post = function (url, data, opts) {
        if (opts === void 0) { opts = {}; }
        this.configureAuth(opts);
        return this.http.post(url, data, opts);
    };
    AuthHttp.prototype.put = function (url, data, opts) {
        if (opts === void 0) { opts = {}; }
        this.configureAuth(opts);
        return this.http.put(url, data, opts);
    };
    AuthHttp.prototype.delete = function (url, opts) {
        if (opts === void 0) { opts = {}; }
        this.configureAuth(opts);
        return this.http.delete(url, opts);
    };
    AuthHttp.prototype.configureAuth = function (opts) {
        var i = localStorage.getItem(this.authKey);
        if (i != null) {
            var auth = JSON.parse(i);
            console.log(auth);
            if (auth.access_token != null) {
                if (opts.headers == null) {
                    opts.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
                }
                opts.headers.set('Authorization', "Bearer " + auth.access_token);
            }
        }
    };
    return AuthHttp;
}());
AuthHttp = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], AuthHttp);

var _a;
//# sourceMappingURL=auth.http.js.map

/***/ })

},[613]);
//# sourceMappingURL=main.bundle.js.map