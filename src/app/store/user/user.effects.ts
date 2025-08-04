import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

import * as UserActions from './user.actions';
import { MockUserService } from '../../services/mock-user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private mockUserService: MockUserService,
    private message: NzMessageService
  ) {}

  // Load User Profile Effects
  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserProfile),
      switchMap(({ userId }) =>
        this.mockUserService.getUserProfile(userId).pipe(
          map(profile => UserActions.loadUserProfileSuccess({ profile })),
          catchError(error => of(UserActions.loadUserProfileFailure({ 
            error: error.message || 'Failed to load user profile' 
          })))
        )
      )
    )
  );

  // Update User Profile Effects
  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserProfile),
      switchMap(({ updates }) =>
        this.mockUserService.updateUserProfile(updates).pipe(
          map(profile => UserActions.updateUserProfileSuccess({ profile })),
          catchError(error => of(UserActions.updateUserProfileFailure({ 
            error: error.message || 'Failed to update user profile' 
          })))
        )
      )
    )
  );

  // Load Gamification Data Effects
  loadGamificationData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadGamificationData),
      switchMap(({ userId }) =>
        this.mockUserService.getGamificationData(userId).pipe(
          map(gamification => UserActions.loadGamificationDataSuccess({ gamification })),
          catchError(error => of(UserActions.loadGamificationDataFailure({ 
            error: error.message || 'Failed to load gamification data' 
          })))
        )
      )
    )
  );

  // Update Points Effects
  updatePoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updatePoints),
      switchMap(({ points, reason }) =>
        this.mockUserService.updatePoints(points, reason).pipe(
          map(response => UserActions.updatePointsSuccess({ 
            newPoints: response.newPoints,
            totalPoints: response.totalPoints
          })),
          tap(({ newPoints }) => {
            if (newPoints > 0) {
              this.message.success(`+${newPoints} points earned! ${reason}`);
            }
          }),
          catchError(error => {
            this.message.error('Failed to update points');
            return of({ type: '[User] Update Points Error' });
          })
        )
      )
    )
  );

  // Award Badge Effects
  awardBadge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.awardBadge),
      switchMap(({ badgeId, reason }) =>
        this.mockUserService.awardBadge(badgeId, reason).pipe(
          map(gamification => UserActions.awardBadgeSuccess({ gamification })),
          tap(() => {
            this.message.success(`🏆 New badge earned! ${reason}`, { nzDuration: 5000 });
          }),
          catchError(error => {
            this.message.error('Failed to award badge');
            return of({ type: '[User] Award Badge Error' });
          })
        )
      )
    )
  );

  // Update Streak Effects
  updateStreak$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateStreak),
      switchMap(({ streakType, increment }) =>
        this.mockUserService.updateStreak(streakType, increment).pipe(
          map(gamification => UserActions.updateStreakSuccess({ gamification })),
          catchError(error => {
            console.error('Failed to update streak:', error);
            return of({ type: '[User] Update Streak Error' });
          })
        )
      )
    )
  );

  // Load User Preferences Effects
  loadUserPreferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserPreferences),
      switchMap(({ userId }) =>
        this.mockUserService.getUserPreferences(userId).pipe(
          map(preferences => UserActions.loadUserPreferencesSuccess({ preferences })),
          catchError(error => of(UserActions.loadUserPreferencesFailure({ 
            error: error.message || 'Failed to load user preferences' 
          })))
        )
      )
    )
  );

  // Update User Preferences Effects
  updateUserPreferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserPreferences),
      switchMap(({ preferences }) =>
        this.mockUserService.updateUserPreferences(preferences).pipe(
          map(updatedPreferences => UserActions.updateUserPreferencesSuccess({ 
            preferences: updatedPreferences 
          })),
          tap(() => {
            this.message.success('Preferences updated successfully');
          }),
          catchError(error => of(UserActions.updateUserPreferencesFailure({ 
            error: error.message || 'Failed to update user preferences' 
          })))
        )
      )
    )
  );

  // Profile Update Success Message
  updateProfileSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserProfileSuccess),
      tap(() => {
        this.message.success('Profile updated successfully');
      })
    ),
    { dispatch: false }
  );

  // Error Message Effects
  userError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.loadUserProfileFailure,
        UserActions.updateUserProfileFailure,
        UserActions.loadGamificationDataFailure,
        UserActions.loadUserPreferencesFailure,
        UserActions.updateUserPreferencesFailure
      ),
      tap(({ error }) => {
        this.message.error(error);
      })
    ),
    { dispatch: false }
  );
}