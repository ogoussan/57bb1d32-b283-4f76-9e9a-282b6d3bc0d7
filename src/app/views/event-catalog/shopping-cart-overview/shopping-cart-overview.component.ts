import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventModel} from "../../../models/event.model";

@Component({
  selector: 'app-shopping-cart-overview',
  templateUrl: './shopping-cart-overview.component.html',
  styleUrls: ['./shopping-cart-overview.component.scss']
})
export class ShoppingCartOverviewComponent implements OnInit {

  @Input() events: EventModel[] = [];
  @Output() removeEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public trackEvent(_: number, item: EventModel) {
    return item.id;
  }

  ngOnInit(): void {
  }

}
