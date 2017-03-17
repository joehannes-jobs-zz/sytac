import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { MeisterDtOService } from './meister-dt-o.service';
import { MeisterDtO, MeisterDtC } from './model';

@Injectable()
export class MeisterDtOResolverService implements Resolve<MeisterDtC> {
  constructor(private meisterDtOService: MeisterDtOService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MeisterDtC> {
    return Observable.fromPromise(this.meisterDtOService.fetch());
  }
}
