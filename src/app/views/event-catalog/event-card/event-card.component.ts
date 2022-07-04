import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventModel} from "../../../models/event.model";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: EventModel;
  @Output() addEvent: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  public openLink(url: string): void {
    window.open(url, '_blank')?.focus();
  }

  ngOnInit(): void {
  }

}
