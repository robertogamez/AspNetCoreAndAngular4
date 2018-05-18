import {
    Component,
    OnInit
} from '@angular/core';

import {
    Http
} from '@angular/http';

@Component({
    selector: 'opengamelist',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title: string = "OpenGameList";

    constructor() {
    }

    
    ngOnInit() {
    }
}
