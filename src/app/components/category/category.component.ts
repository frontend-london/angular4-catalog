import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/Item';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-items',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
    
  } 

}
