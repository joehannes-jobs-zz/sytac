import { Injectable } from '@angular/core';
import { trafficMeister } from '../assets/data/index';
import { MeisterDtO, MeisterDtC } from './model';

@Injectable()
export class MeisterDtOService {
  private _error: string;
  private _collection: MeisterDtC;

  constructor() { }

  public fetch(): Promise<MeisterDtC> {
    let q = new Promise((resolve, reject) => {
      let callback = (err, data): void => {
        if (err) {
          this._error = err;
          reject(this._collection || new MeisterDtC([]));
        } else {
          this._collection = new MeisterDtC(data);
          resolve(this._collection);
        }
      };
      trafficMeister.fetchData(callback);
    });
    return q;
  }
  public get error(): string {
    let e = this._error;
    this._error = null;
    return e;
  }
}
