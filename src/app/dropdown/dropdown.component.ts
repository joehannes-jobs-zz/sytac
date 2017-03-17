import { Component, OnInit, AfterViewInit, Input, ElementRef, EventEmitter } from '@angular/core';

declare var $;

@Component({
  selector: 'meister-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass']
})
export class DropdownComponent implements AfterViewInit {
  @Input() items = [];
  @Input() filterType: string = "types";
  @Input() iconType: string = "filter";
  public selected: number;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    $('.ui.dropdown', this.el.nativeElement).dropdown();
  }

  public clear(ev: Event): void {
    $('.ui.dropdown', this.el.nativeElement).dropdown('restore defaults');
    this.selected = null;
  }
  public select(nr: number): void {
    this.selected = nr;
  }
  public active(): boolean {
    return typeof this.selected !== 'undefined' && this.selected !== null;
  }
}
