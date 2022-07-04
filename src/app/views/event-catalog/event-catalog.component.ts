import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {FilterService} from "./filter.service";
import {EventDateGroup, EventFilter, EventLocation, EventModel} from "../../models/event.model";
import {EventApiService} from "../../api/event-api.service";
import {ShoppingCartService} from "./shopping-cart.service";

interface DateOffset {
  date?: Date ,
  offset: number
}

@Component({
  selector: 'app-event-catalog',
  templateUrl: './event-catalog.component.html',
  styleUrls: ['./event-catalog.component.scss']
})

export class EventCatalogComponent implements OnDestroy {
  @ViewChild('eventCatalogElement') eventCatalogElement: ElementRef;

  public searchTerm: string = '';
  public eventFilter: EventFilter;

  private _searchTermSubscription: Subscription;
  private _eventFilterSubscription: Subscription;
  private _shoppingCartEventsSubscription: Subscription;

  public events: EventModel[] = [];
  public shoppingCartEvents: EventModel[] = [];
  public dateOffset: DateOffset;
  public dateOffsetList: DateOffset[] = [];
  public scrollTop: number = 0;

  constructor(
    private _filterService: FilterService,
    private _shoppingCartService: ShoppingCartService,
    private _eventsApiService: EventApiService
  ) {
    this._eventFilterSubscription = this._filterService.eventFilter$.subscribe((eventFilter: EventFilter) => {
      /** Fetch events at the beginning and everytime the location changes**/
      if (!this.eventFilter || this.eventFilter.location.id != eventFilter.location.id) {
        this.fetchEvents(eventFilter.location);
      }

      this.eventFilter = eventFilter;
      this.dateOffsetList = [];
    });

    this._shoppingCartEventsSubscription = this._shoppingCartService.events$.subscribe((events: EventModel[]) => {
      this.shoppingCartEvents = events;
    })
  }

  public fetchEvents(eventLocation: EventLocation) {
    this._eventsApiService.getEvents(eventLocation).subscribe((events: EventModel[]) => {
      this.events = events.filter(event => !event.private);
    });
  }

  public getMatchingEventDateGroups(): EventDateGroup[] {
    return this.getSortedEventGroups(this.getFilteredEvents());
  }

  public getFilteredEvents(): EventModel[] {
    return this.events.filter(
      (event) =>
      (
        this.isEventInTimeRange(event) &&
        !this.isInShoppingCart(event.id) &&
        this.containsSearchTerm(event)
      )
    )
  }

  public getSortedEventGroups(events: EventModel[]): EventDateGroup[] {
    const eventDateGroupList: EventDateGroup[] = [];

    events.forEach((event: EventModel) => {
      const index = eventDateGroupList.findIndex(eventDateGroup => event.date.getTime() === eventDateGroup.date.getTime());

      if (index !== -1) {
        // eventList with date already exists, add event to eventList
        eventDateGroupList[index].events.push(event);
      } else {
        // eventList with date does not exist, create new eventList
        eventDateGroupList.push({
          date: event.date,
          events: [event]
        })
      }
    });

    return eventDateGroupList.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  public isEventInTimeRange(event: EventModel): boolean {
    return event.startTime >= this.eventFilter.startTime && event.endTime <= this.eventFilter.endTime
  }

  public updateSearchTerm(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  public containsSearchTerm(event: EventModel): boolean {
    return event.title.includes(this.searchTerm);
  }

  public isInShoppingCart(eventId: string): boolean {
    return this.shoppingCartEvents.some((event: EventModel) => event.id === eventId);
  }

  public updateCurrentDateHeader(): void {
    this.scrollTop = this.eventCatalogElement.nativeElement.scrollTop;
    this.dateOffset = this.dateOffsetList
      .filter(dateOffset => dateOffset.offset < (this.scrollTop || 0))
      .reduce((dateOffset: DateOffset, maxDateOffset: DateOffset) => {
          if (dateOffset.offset > maxDateOffset.offset) {
            return dateOffset;
          } else {
            return maxDateOffset;
          }
        },
        {
          offset: -1
        }
      );
  }

  public addDateOffset(date: Date, offset: number): void {
    this.dateOffsetList.push(
      {
        date: date,
        offset: offset
      }
    );
  }

  public addEventToShoppingCart(event: EventModel): void {
    this._shoppingCartService.addEvent(event);
  }

  public removeEventFromShoppingCart(eventId: string): void {
    this._shoppingCartService.removeEventById(eventId);
  }

  public trackEventDateGroup(index: number, item: EventDateGroup){
    return item.date;
  }

  public onScroll(): void {
    this.updateCurrentDateHeader();
  }

  ngOnDestroy(): void {
    this._searchTermSubscription.unsubscribe();
    this._eventFilterSubscription.unsubscribe();
  }
}
