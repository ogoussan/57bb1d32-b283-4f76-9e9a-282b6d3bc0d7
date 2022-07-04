import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable,} from "rxjs";
import {EventFilter} from "../../models/event.model";
import {defaultEventFilter} from "./event.config";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _eventFilter: BehaviorSubject<EventFilter> = new BehaviorSubject<EventFilter>(defaultEventFilter);
  public eventFilter$: Observable<EventFilter> = this._eventFilter.asObservable();

  constructor() { }

  public updateEventFilter(newEventFilter: EventFilter): void {
    this._eventFilter.next(newEventFilter);
  }
}
