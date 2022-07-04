import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {EventLocation, EventModel} from "../../../models/event.model";
import {OverlayComponent} from "../../../components/overlay/overlay.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /**
   * Default start date
   */
  @Input() public startDate: Date;

  /**
   * Default end date
   */
  @Input() public endDate: Date;

  @Input() public shoppingCartEvents: EventModel[];

  @Input() public currentLocationOption: EventLocation

  @Output() public searchTerm: EventEmitter<string> = new EventEmitter<string>();

  @Output() public removeEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filterMenuOverlay') filterMenuOverlay: OverlayComponent;

  constructor() { }

  public closeFilterMenu(): void {
    this.filterMenuOverlay.closeOverlay()
  }
}

