import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {EventDateGroup, EventModel} from "../../../models/event.model";

@Component({
  selector: 'app-event-date-group',
  templateUrl: './event-date-group.component.html',
  styleUrls: ['./event-date-group.component.scss']
})
export class EventDateGroupComponent implements AfterViewInit {

  @Input() eventDateGroup: EventDateGroup;
  @Output() offsetTop: EventEmitter<number> = new EventEmitter<number>();
  @Output() addEvent: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @ViewChild('eventDateGroupElement') eventDateGroupElement: ElementRef;

  public trackEvent(index: number, item: EventModel){
    return item.id;
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.offsetTop.emit(this.eventDateGroupElement.nativeElement.offsetTop)
  }
}
