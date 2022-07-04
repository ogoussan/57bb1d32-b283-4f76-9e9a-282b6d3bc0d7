import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {EventFilter, EventLocation} from "../../../models/event.model";
import {locationOptions} from "../event.config";
import {FilterService} from "../filter.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit, OnDestroy {
  @ViewChild('startDateInput') startDateInput: ElementRef;
  @ViewChild('endDateInput') endDateInput: ElementRef;

  @Output() onFilterUpdate: EventEmitter<null> = new EventEmitter();

  public currentMenuFilter: EventFilter = {
    startTime: new Date(),
    endTime: new Date(),
    location: locationOptions[0]
  };

  public set startDateString(startDateString: string) {
    this.currentMenuFilter.startTime = new Date(startDateString);
  }

  public get startDateString(): string {
    return this.getFormattedDateString(this.currentMenuFilter.startTime);
  }

  public set endDateString(endDateString: string) {
    this.currentMenuFilter.endTime = new Date(endDateString);
  }

  public get endDateString(): string {
    return this.getFormattedDateString(this.currentMenuFilter.endTime);
  }

  public appliedEventFilter: EventFilter;

  public locationOptions: EventLocation[] = locationOptions;

  private _eventFilterSubscription: Subscription;

  constructor(private _filterService: FilterService) {
  }

  public getFormattedDateString(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  public selectEventLocation(eventLocation: EventLocation): void {
    if (this.currentMenuFilter) {
      this.currentMenuFilter.location = eventLocation;
    }
  }

  public updateEventFilter(): void {
    this._filterService.updateEventFilter(
      this.currentMenuFilter
    );

    this.onFilterUpdate.emit();
  }

  ngOnInit(): void {
    this._eventFilterSubscription = this._filterService.eventFilter$.subscribe((eventFilter: EventFilter) => {
      this.appliedEventFilter = eventFilter;
      this.currentMenuFilter = {...this.appliedEventFilter};
    });
  }

  ngOnDestroy(): void {
    this._eventFilterSubscription.unsubscribe();
  }
}
