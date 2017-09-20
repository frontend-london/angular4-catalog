import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/Item';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items:any[];
  categories:any[];
  totalOwed:number;

  constructor(
    // [
      public itemService:ItemService,
      public categoryService:CategoryService
    // ]
  ) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      // debugger;
      this.getTotalOwed();
    });

    this.categoryService.getCategories().subscribe(categories => {
      // debugger;
      this.categories = categories;
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
