import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Item } from '../models/Item';

@Injectable()
export class ItemService {
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase
  ) { 
    this.items = this.af.list('/items') as FirebaseListObservable<Item[]>;
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
