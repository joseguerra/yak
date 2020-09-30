import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Event } from "../models/event";

@Injectable()
export class EventService {
  events: AngularFireList<Event>;
  event: AngularFireObject<Event>;

  // favouriteProducts
  constructor(
    private db: AngularFireDatabase
  ) {
    this.events = this.db.list("events");
  }

  getProducts() {
    this.events = this.db.list("products");
    return this.events;
  }

  addRider(data: Event, callback: () => void) {
    this.events.push(data);
    callback();
  }
}