import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import 'rxjs/RX';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailEditComponent } from './item-detail-edit/item-detail-edit.component';
import { ItemDetailViewComponent } from './item-detail-view/item-detail-view.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

// Route
import { AppRouting } from './route/route.module';

// Services
import { ItemService } from './item.service';
import { AuthService } from './auth/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        ItemListComponent,
        ItemDetailEditComponent,
        ItemDetailViewComponent,
        AboutComponent,
        LoginComponent,
        PageNotFoundComponent,
        HomeComponent,
        ItemDetailViewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        AppRouting
    ],
    providers: [
        ItemService,
        AuthService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
