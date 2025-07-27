import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import * as LocationActions from './location.actions';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocationEffects {
  private actions$ = inject(Actions);
  private platformId = inject(PLATFORM_ID);

  // Save location to storage when setLocation is dispatched
  saveLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.setLocation),
      tap(({ county, city, district }) => {
        if (isPlatformBrowser(this.platformId)) {
          try {
            sessionStorage.setItem('civica-location', JSON.stringify({ county, city, district }));
          } catch (error) {
            console.error('Failed to save location to storage:', error);
          }
        }
      })
    ),
    { dispatch: false }
  );

  // Load location from storage
  loadLocationFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.loadLocationFromStorage),
      map(() => {
        if (isPlatformBrowser(this.platformId)) {
          try {
            const stored = sessionStorage.getItem('civica-location');
            if (stored) {
              const location = JSON.parse(stored);
              // Validate the parsed data has expected properties
              if (location && typeof location === 'object' && 
                  'county' in location && 'city' in location && 'district' in location) {
                return LocationActions.setLocation({
                  county: location.county,
                  city: location.city,
                  district: location.district
                });
              }
            }
          } catch (error) {
            console.error('Failed to parse location from storage:', error);
            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.removeItem('civica-location');
            }
          }
        }
        // Return a no-op action if storage is empty or invalid
        return { type: '[Location] Load Location From Storage Complete' };
      })
    )
  );

  // Clear location from storage
  clearLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.clearLocation),
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          try {
            sessionStorage.removeItem('civica-location');
          } catch (error) {
            console.error('Failed to clear location from storage:', error);
          }
        }
      })
    ),
    { dispatch: false }
  );
}