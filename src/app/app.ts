import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styleUrl: './app.scss',
  standalone: true
})
export class App implements OnInit {
  private _store = inject(Store<AppState>);
  protected title = 'Civica';

  ngOnInit(): void {
    // Restore auth state from Supabase session on app startup
    this._store.dispatch(AuthActions.loadUserFromStorage());
  }
}
