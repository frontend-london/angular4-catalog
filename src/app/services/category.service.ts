import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable()
export class CategoryService {
  categories: FirebaseListObservable<any[]>;
  category: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase
  ) { 
    this.categories = this.af.list('/categories') as FirebaseListObservable<Category[]>;
  }

  getCategories(){
    return this.categories;
  }

  newCategory(category:Category){
    this.categories.push(category);
  }

  getCategory(id:string){
    this.category = this.af.object('/categories/'+id) as FirebaseObjectObservable<Category>;
    return this.category;
  }

  updateCategory(id:string, category:Category){
    return this.categories.update(id, category);
  }

  deleteCategory(id:string){
    return this.categories.remove(id);
  }

}
