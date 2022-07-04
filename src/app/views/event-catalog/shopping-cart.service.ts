import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EventModel} from "../../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _events: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);

  public events$: Observable<EventModel[]> = this._events.asObservable();

  constructor() { }

  public addEvent(event: EventModel): void {
    this._events.next([...this._events.value, event]);
  }

  public removeEventById(eventId: string): void {
    this._events.next([...this._events.value.filter(event => event.id !== eventId)]);
  }
}
