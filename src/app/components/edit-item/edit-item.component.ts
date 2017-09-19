import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Item } from '../../models/Item';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  id:string;
  item:Item = {
    firstName:'',
    lastName: '',
    email:'',
    phone:'',
    balance:0
  }

  disableBalanceOnEdit:boolean = true;

  constructor(
    public itemService:ItemService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Get Item
    this.itemService.getItem(this.id).subscribe(item => {
      this.item = item;
    });

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}:{value:Item, valid:boolean}){
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate(['edit-item/'+this.id]);
    } else {
      // Update item
      this.itemService.updateItem(this.id, value);
      this.flashMessagesService.show('Item updated', {cssClass:'alert-success', timeout: 4000});
      this.router.navigate(['/item/'+this.id]);
    }
  }

}
