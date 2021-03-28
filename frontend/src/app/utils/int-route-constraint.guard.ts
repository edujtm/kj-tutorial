import { Injectable } from '@angular/core';
import { UrlTree, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


const isNumeric = (str: string) => {
  return !isNaN(parseFloat(str));
};

@Injectable()
export class IntRouteConstraint implements CanActivate {

  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot 
  ) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return isNumeric(route.params.id);
  }
}
