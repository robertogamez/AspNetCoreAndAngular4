webpackJsonp([1,4],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
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
        template: __webpack_require__(316),
        styles: [__webpack_require__(307)]
    }),
    __metadata("design:paramtypes", [])
], AboutComponent);

//# sourceMappingURL=about.component.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
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
        template: __webpack_require__(318),
        styles: [__webpack_require__(308)]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__item_service__ = __webpack_require__(50);
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
    function ItemDetailEditComponent(itemService, router, activatedRoute) {
        this.itemService = itemService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    ItemDetailEditComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        template: __webpack_require__(319),
        styles: [__webpack_require__(309)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__item_service__["a" /* ItemService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], ItemDetailEditComponent);

var _a, _b, _c;
//# sourceMappingURL=item-detail-edit.component.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_service__ = __webpack_require__(50);
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
    function ItemDetailViewComponent(itemService, router, activatedRoute) {
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
        template: __webpack_require__(320),
        styles: [__webpack_require__(310)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], ItemDetailViewComponent);

var _a, _b, _c;
//# sourceMappingURL=item-detail-view.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
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
    function LoginComponent() {
        this.title = "Login";
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__(322),
        styles: [__webpack_require__(312)]
    }),
    __metadata("design:paramtypes", [])
], LoginComponent);

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
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
        template: __webpack_require__(323),
        styles: [__webpack_require__(313)]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);

//# sourceMappingURL=page-not-found.component.js.map

/***/ }),

/***/ 239:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 239;


/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(252);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
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
    function AppComponent(router) {
        this.router = router;
        this.title = "OpenGameList";
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.isActive = function (data) {
        return this
            .router
            .isActive(this.router.createUrlTree(data), true);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'opengamelist',
        template: __webpack_require__(317),
        styles: [__webpack_require__(314)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_RX__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_RX___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_RX__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__item_list_item_list_component__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__item_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__item_detail_edit_item_detail_edit_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__item_detail_view_item_detail_view_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__about_about_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__login_login_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__page_not_found_page_not_found_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__home_home_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__route_route_module__ = __webpack_require__(251);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















// Route

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
            __WEBPACK_IMPORTED_MODULE_10__item_detail_edit_item_detail_edit_component__["a" /* ItemDetailEditComponent */],
            __WEBPACK_IMPORTED_MODULE_11__item_detail_view_item_detail_view_component__["a" /* ItemDetailViewComponent */],
            __WEBPACK_IMPORTED_MODULE_12__about_about_component__["a" /* AboutComponent */],
            __WEBPACK_IMPORTED_MODULE_13__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_14__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_15__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_11__item_detail_view_item_detail_view_component__["a" /* ItemDetailViewComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_16__route_route_module__["a" /* AppRouting */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__item_service__["a" /* ItemService */],
            { provide: __WEBPACK_IMPORTED_MODULE_5__angular_common__["a" /* LocationStrategy */], useClass: __WEBPACK_IMPORTED_MODULE_5__angular_common__["b" /* HashLocationStrategy */] }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_service__ = __webpack_require__(50);
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
        template: __webpack_require__(321),
        styles: [__webpack_require__(311)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], ItemListComponent);

var _a, _b;
//# sourceMappingURL=item-list.component.js.map

/***/ }),

/***/ 250:
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

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_not_found_page_not_found_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__item_detail_edit_item_detail_edit_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__item_detail_view_item_detail_view_component__ = __webpack_require__(110);
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
        path: "**",
        component: __WEBPACK_IMPORTED_MODULE_4__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */]
    }
];
var AppRoutingProviders = [];
var AppRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=route.module.js.map

/***/ }),

/***/ 252:
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

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 316:
/***/ (function(module, exports) {

module.exports = "<h2>{{title}}</h2>\r\n<div>\r\n    OpenGameList: a production-ready, fully-featured SPA sample powered by ASP.NET Core Web API and Angular 4\r\n</div>"

/***/ }),

/***/ 317:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse navbar-fixed-top\">\r\n    <div class=\"container-fluid\">\r\n        <input type=\"checkbox\" id=\"navbar-toggle-cbox\" />\r\n        <div class=\"navbar-header\">\r\n            <label for=\"navbar-toggle-cbox\" class=\"navbar-toggle collapsed\"\r\n                   data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\r\n                   aria-controls=\"navbar\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </label>\r\n            <a class=\"navbar-brand\" href=\"#\">\r\n                <img alt=\"logo\" src=\"../assets/img/logo.svg\" />\r\n            </a>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\" id=\"navbar\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li [class.active]=\"isActive([''])\">\r\n                    <a class=\"home\"  \r\n                       [routerLink]=\"['']\">Home</a>\r\n                </li>\r\n                <li [class.active]=\"isActive(['about'])\">\r\n                    <a class=\"about\" \r\n                       [routerLink]=\"['about']\">About</a>\r\n                </li>\r\n                <li [class.active]=\"isActive(['login'])\">\r\n                    <a class=\"login\" \r\n                       [routerLink]=\"['login']\">Login</a>\r\n                </li>\r\n                <li [class.active]=\"isActive(['item/edit', 0])\">\r\n                    <a class=\"add\" \r\n                       [routerLink]=\"['item/edit', 0]\">Add</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<h1 class=\"header\">{{title}}</h1>\r\n<div class=\"main-container\">\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 318:
/***/ (function(module, exports) {

module.exports = "<h2>\r\n    A non-comprehensive directory of open-source video games\r\n    available on the web\r\n</h2>\r\n<div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n        <item-list class=\"latest\"></item-list>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n        <item-list class=\"most-viewed\"></item-list>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n        <item-list class=\"random\"></item-list>\r\n    </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ 319:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"item\">\r\n    <h2>\r\n        <a href=\"#\" (click)=\"onBack()\">\r\n            &laquo; Back to Home\r\n        </a>\r\n    </h2>\r\n    <div class=\"item-container\">\r\n        <ul class=\"nav nav-tabs\">\r\n            <li role=\"presentation\" class=\"active\">\r\n                <a href=\"#\">Edit</a>\r\n            </li>\r\n            <li role=\"presentation\" *ngIf=\"item.Id != 0\">\r\n                <a href=\"#\" (click)=\"onItemDetailView(item)\">View</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-body\">\r\n               <form class=\"item-detail-edit\">\r\n                   <h3>\r\n                       {{item.Title}}\r\n                       <span class=\"empty-field\" [hidden]=\"dTitle.valid\">\r\n                           Empty Title\r\n                       </span>\r\n                   </h3>\r\n                   <div class=\"form-group has-feedback\" \r\n                        [ngClass]=\"{ 'has-success': dTitle.valid, 'has-error': !dTitle.valid }\">\r\n                       <label for=\"input-title\">Title</label>\r\n                       <input id=\"input-title\" name=\"input-title\"\r\n                              type=\"text\" class=\"form-control\"\r\n                              [(ngModel)]=\"item.Title\"\r\n                              placeholder=\"Insert the title...\"\r\n                              required #dTitle=\"ngModel\" />\r\n                       <span class=\"glyphicon form-control-feedback\" aria-hidden=\"true\"\r\n                             [ngClass]=\"{'glyphicon-ok': dTitle.valid, 'glyphicon-remove': !dTitle.valid}\"></span>\r\n                       <div [hidden]=\"dTitle.valid\" class=\"alert alert-danger\">\r\n                           You need to enter a valid Title.\r\n                       </div>\r\n                   </div>\r\n                   <div class=\"form-group\">\r\n                       <label for=\"input-description\">Description</label>\r\n                       <textarea id=\"input-description\" name=\"input-description\"\r\n                                 class=\"form-control\" [(ngModel)]=\"item.Description\"\r\n                                 placeholder=\"Insert a suitable description...\" required></textarea>\r\n                   </div>\r\n                   <div class=\"form-group\">\r\n                       <label for=\"input-text\">\r\n                           Text\r\n                       </label>\r\n                       <textarea id=\"input-text\" name=\"input-text\"\r\n                                 class=\"form-control\" [(ngModel)]=\"item.Text\"\r\n                                 placeholder=\"Insert a suitable description...\"></textarea>\r\n                   </div>\r\n                   <div *ngIf=\"item.Id == 0\" class=\"commands insert\">\r\n                       <input type=\"button\" class=\"btn btn-primary\"\r\n                              value=\"Save\" (click)=\"onInsert(item)\" />\r\n                       <input type=\"button\" class=\"btn btn-default\"\r\n                              value=\"Cancel\" (click)=\"onBack()\" />\r\n                   </div>\r\n                   <div *ngIf=\"item.Id != 0\" class=\"commands update\">\r\n                       <input type=\"button\" class=\"btn btn-primary\"\r\n                              value=\"Update\" (click)=\"onUpdate(item)\" />\r\n                       <input type=\"button\" class=\"btn btn-danger\"\r\n                              value=\"Delete\" (click)=\"onDelete(item)\" />\r\n                       <input type=\"button\" class=\"btn btn-default\"\r\n                              value=\"Cancel\" (click)=\"onItemDetailView(item)\" />\r\n                   </div>\r\n               </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 320:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"item\">\r\n    <h2>\r\n        <a href=\"#\" (click)=\"onBack()\">&laquo; Back to Home</a>\r\n    </h2>\r\n    <div class=\"item-container\">\r\n        <ul class=\"nav nav-tabs\">\r\n            <li role=\"presentation\">\r\n                <a href=\"#\" (click)=\"onItemDetailEdit(item)\">Edit</a>\r\n            </li>\r\n            <li role=\"presentation\" class=\"active\">\r\n                <a href=\"#\">View</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"item-page-panel\">\r\n                    <img src=\"/assets/img/item-image-sample.png\" alt=\"{{item.Title}}\" />\r\n                    <div class=\"caption\">Sample image with caption.</div>\r\n                </div>\r\n                <h3>{{item.Title}}</h3>\r\n                <p>{{item.Description}}</p>\r\n                <p>{{item.Text}}</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 321:
/***/ (function(module, exports) {

module.exports = "<h3 class=\"item-list-title\">\r\n    {{title}}\r\n</h3>\r\n<ul class=\"items\">\r\n    <li *ngFor=\"let item of items\"\r\n        [class.selected]=\"item === selectedItem\"\r\n        (click)=\"onSelect(item)\">\r\n        <div class=\"title\">{{item.Title}}</div>\r\n        <div class=\"description\">{{item.Description}}</div>\r\n    </li>\r\n</ul>"

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

module.exports = "<h2>{{title}}</h2>\r\n<div>\r\n    TODO: Not implemted yet.\r\n</div>"

/***/ }),

/***/ 323:
/***/ (function(module, exports) {

module.exports = "<h2>{{title}}</h2>\r\n<div>\r\n    Oops.. This page does not exist (yet!).\r\n</div>"

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
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
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({
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
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], ItemService);

var _a;
//# sourceMappingURL=item.service.js.map

/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(240);


/***/ })

},[607]);
//# sourceMappingURL=main.bundle.js.map