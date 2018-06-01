import {
    Component,
    OnInit
} from '@angular/core';

import {
    Http
} from '@angular/http';

import {
    Router
} from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
    selector: 'opengamelist',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title: string = "OpenGameList";

    constructor(
        public router: Router,
        public authService: AuthService
    ) {
    }

    ngOnInit() {
    }

    isActive(data: any[]): boolean {
        return this
            .router
            .isActive(this.router.createUrlTree(data), true);
    }

    logout(): boolean {
        if (this.authService.logout()) {
            this.router.navigate(['']);
        }

        return false;
    }

}
