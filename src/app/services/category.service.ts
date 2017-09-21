import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable()
export class CategoryService {
  categories: FirebaseListObservable<any[]>;
  category: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase,
    public router:Router,
  ) { 
    var self = this;
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        var id = self.router.routerState.snapshot.root.firstChild.params.id ? self.router.routerState.snapshot.root.firstChild.params.id : '';
        self.categories = self.af.list('/categories',
          {
            query: {
              limitToLast: 10,
              orderByChild: 'category',
              equalTo: id,
            }
          }
        ); 
      }
    });


    // this.categories = this.af.list('/categories') as FirebaseListObservable<Category[]>;
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
