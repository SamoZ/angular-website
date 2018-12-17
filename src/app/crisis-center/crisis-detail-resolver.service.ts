import { CrisisService } from './crisis.service';
import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Resolve
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { Crisis } from './crisis';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CrisisDetailResolverService implements Resolve<Crisis> {
    constructor(private cs: CrisisService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Crisis> | Observable<never> {
        const id = route.paramMap.get('id');

        return this.cs.getCrisis(id).pipe(
            take(1),
            mergeMap(crisis => {
                if (crisis) {
                    return of(crisis);
                } else {
                    this.router.navigate(['/crisis-center']);
                    return EMPTY;
                }
            })
        );
    }
}
