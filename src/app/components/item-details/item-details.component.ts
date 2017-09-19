import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  id:string;
  item: Item;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(
    public itemService:ItemService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];

    // Get Item
    this.itemService.getItem(this.id).subscribe(item => {
      if(item.balance > 0){
        this.hasBalance = true;
      }
      this.item = item;
    });
  }

  updateBalance(id:string){
    // Update item
    this.itemService.updateItem(this.id, this.item);
    this.flashMessagesService.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/item/'+this.id]);
  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?")){
      this.itemService.deleteItem(this.id);
      this.flashMessagesService.show('Item Deleted', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }

}
