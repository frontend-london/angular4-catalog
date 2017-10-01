import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'; 
import { ItemService } from '../../services/item.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Category } from '../../models/Category';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  id:string;
  item: Item;
  category: Category;
  showBalanceUpdateInput:boolean = false;

  constructor(
    public categoryService:CategoryService,
    public itemService:ItemService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { 
    var self = this;
    // self.category.firstName = '';
    // self.category.lastName = '';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        var id = self.router.routerState.snapshot.root.firstChild.params.id ? self.router.routerState.snapshot.root.firstChild.params.id : '';

        if (id) {
          if (self.router.routerState.snapshot.root.firstChild.url[0].path === 'item') {
            this.itemService.getItem(id).subscribe(item => {
              self.item = item;
            });
          } else {
            this.categoryService.getCategory(id).subscribe(category => {
              self.category = category;
            });
          }

          
        } else {
          self.item = null;
          self.category = null;
          // self.category = new Category({
          //   firstName: 'aaa',
          //   lastName: 'aaa'
          // });
          // self.category.firstName = 'aaa';
          // self.category.lastName = 'aaa';
        }

        // debugger;
        
        // self.categories = self.af.list('/categories',
        //   {
        //     query: {
        //       limitToLast: 10,
        //       orderByChild: 'category',
        //       equalTo: id,
        //     }
        //   }
        // ); 
      }
    });
  }

  ngOnInit() {
    
    // Get ID
    // this.id = this.route.snapshot.params['id'];

    // // Get Category
    // debugger;
    // this.categoryService.getCategory(this.id).subscribe(category => {
    //   this.category = category;
    //   debugger;
    // });
  }


}
