import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  private preventChangeNav$ = new Subject<boolean>();

  public changeNav$ = new Subject<menu>();

  constructor() {}

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
  }

  setPrevent(state: boolean) {
    this.preventChangeNav$.next(state);
  }

  getPrevent() {
    return this.preventChangeNav$.asObservable();
  }

  /**
   * observer para informar del cambio del menu de navegacion lateral.
   */
  getChangeNav() {
    return this.changeNav$.asObservable();
  }
}
