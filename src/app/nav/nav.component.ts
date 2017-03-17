import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MeisterDtO, MeisterDtC } from '../model';

@Component({
  selector: 'meister-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  public activeMenuNr: number;
  public types: string[] = [];
  public brands: string[] = [];
  public colors: string[] = [];
  private _data: MeisterDtC;

  constructor (private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { meisters: MeisterDtC }) => {
        this._data = data.meisters;
        this._data.toArray().forEach((el: any): void => {
          if (this.types.filter((_el): boolean => {
            return (el.type === _el);
          }).length === 0) {
            this.types.push(el.type);
          }
          this.brands.push(el.brand);
          this.colors.filter((_el): void => {
            let filtered = (el.colors.filter((__c): boolean => {
                return (__c === _el);
            }));
            this.colors.concat(filtered);
          });
        });
      });
  }
}
