import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-item-detail-view',
    templateUrl: './item-detail-view.component.html',
    styleUrls: ['./item-detail-view.component.scss']
})
export class ItemDetailViewComponent implements OnInit {

    item: Item;

    constructor(
        private authService: AuthService,
        private itemService: ItemService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        var id = this.activatedRoute.snapshot.params['id'];
        if (id > 0) {
            this.itemService.get(id).subscribe(item => this.item = item);
        } else if (id === 0) {
            console.log('id is 0: switching to edit mode...');
            this.router.navigate(['item/edit', 0]);
        } else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate(['']);
        }
    }

    onItemDetailEdit(item: Item) {
        this.router.navigate(['item/edit', item.Id]);
        return false;
    }

    onBack() {
        this.router.navigate(['']);
    }

}
