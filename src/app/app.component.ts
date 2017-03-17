import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'meister-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public copyright: "(c) joehannes <3";

  constructor () {}

  ngOnInit() {
  }
}
