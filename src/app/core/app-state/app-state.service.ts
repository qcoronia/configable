import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { AppState } from '../models/app-state.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public state$: BehaviorSubject<AppState>;

  constructor() {
    this.state$ = new BehaviorSubject<AppState>({
      headerName: ''
    });
  }

  public set(newState: Partial<AppState>) {
    this.state$.next(Object.assign({}, this.state$.value, newState));
  }
}
