import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input() tagContent: TemplateRef<any>;
  @Input() containsFlag: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
