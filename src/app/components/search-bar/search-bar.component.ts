import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
