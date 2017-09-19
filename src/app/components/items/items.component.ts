import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items:any[];
  totalOwed:number;

  constructor(
    public itemService:ItemService
  ) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.getTotalOwed();
    });
  }

  getTotalOwed(){
    let total = 0;
    for(let i = 0;i < this.items.length;i++){
      total += parseFloat(this.items[i].balance);
    }
    this.totalOwed = total;
    console.log(this.totalOwed);
  }

}
