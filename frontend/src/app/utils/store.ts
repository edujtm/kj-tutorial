import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';



export class Store<T> {
  private store$: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  protected get state(): T {
    return this.store$.getValue();
  }

  constructor(initialState: T) {
    this.store$ = new BehaviorSubject<T>(initialState);
  }

  protected select<K>(transform: (state: T) => K): Observable<K> {
    return this.store$.asObservable().pipe(
      map((state) => transform(state)),
      distinctUntilChanged()
    );
  }

  protected update(newState: Partial<T>) {
    this.store$.next({
      ...this.state,
      ...newState
    });
  }
}
