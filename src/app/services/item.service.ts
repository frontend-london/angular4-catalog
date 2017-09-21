import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Item } from '../models/Item';

@Injectable()
export class ItemService {
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase,
    public router:Router,
    public route:ActivatedRoute
  ) { 
    var self = this;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        var id = self.router.routerState.snapshot.root.firstChild.params.id ? self.router.routerState.snapshot.root.firstChild.params.id : '';
        self.items = self.af.list('/items',
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
  }

  getItems(){
    return this.items;
  }

  newItem(item:Item){
    this.items.push(item);
  }

  getItem(id:string){
    this.item = this.af.object('/items/'+id) as FirebaseObjectObservable<Item>;
    return this.item;
  }

  updateItem(id:string, item:Item){
    return this.items.update(id, item);
  }

  deleteItem(id:string){
    return this.items.remove(id);
  }

}
