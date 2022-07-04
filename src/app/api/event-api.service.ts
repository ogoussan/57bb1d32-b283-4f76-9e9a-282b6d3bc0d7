import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {API_URLs} from "./API-URLs";
import {EventLocation, EventModel} from "../models/event.model";
import {map, Observable} from "rxjs";
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  private _apiURL = API_URLs.EVENT_APP;

  constructor(
    private _http: HttpClient
  ) {
  }

  getEvents(eventLocation: EventLocation): Observable<EventModel[]> {
    const endpoint = `/events/${eventLocation.country}/${eventLocation.city}`;
    return this._http
      .get<EventModel[]>(this._apiURL + endpoint).pipe(
        map(
          (events: EventModel[]) => events.map(event => {
            return {
              ...event,
              id: uuidv4(),
              date: new Date(event.date),
              startTime: new Date(event.startTime),
              endTime: new Date(event.endTime)
            }
          })
        )
      );
  }
}
