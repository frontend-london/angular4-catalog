import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  id:string;
  category: Category;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(
    public categoryService:CategoryService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];

    // Get Category
    this.categoryService.getCategory(this.id).subscribe(category => {
      if(category.balance > 0){
        this.hasBalance = true;
      }
      this.category = category;
    });
  }

  updateBalance(id:string){
    // Update category
    this.categoryService.updateCategory(this.id, this.category);
    this.flashMessagesService.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/category/'+this.id]);
  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?")){
      this.categoryService.deleteCategory(this.id);
      this.flashMessagesService.show('Category Deleted', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }

}
