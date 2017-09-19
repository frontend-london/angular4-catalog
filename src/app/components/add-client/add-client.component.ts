import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item:Item = {
    name:'',
    description:'',
    location:'',
    category:'',
    balance:0
  }
  disableBalanceOnAdd:boolean = false;
  
  constructor(
    public flashMessagesService:FlashMessagesService,
    public router:Router,
    public itemService:ItemService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}:{value:Item, valid:boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate(['add-item']);
    } else {
      // Add new item
      this.itemService.newItem(value);
      this.flashMessagesService.show('New item added', {cssClass:'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
