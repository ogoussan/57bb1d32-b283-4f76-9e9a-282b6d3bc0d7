import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, AfterViewInit {
  @Input() public triggerTemplate: TemplateRef<any>;
  @Input() public contentTemplate: TemplateRef<any>;
  @Input() public top: string = '0';
  @Input() public left: string = '0';

  @ViewChild('overlayTrigger') overlayTrigger: ElementRef;
  @ViewChild('overlayContent') overlayContent: ElementRef;

  public isOverlayContentVisible: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.overlayContent.nativeElement.style.top = this.top;
    this.overlayContent.nativeElement.style.left = this.left;
  }

  public closeOverlay() {
    this.isOverlayContentVisible = false;
  }

  public openOverlay() {
    this.isOverlayContentVisible = true;
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(e: MouseEvent): void {
    if (!this.overlayContent.nativeElement.contains(e.target)) {
      // clicked outside overlay content
      this.closeOverlay();
    }
  }
}
