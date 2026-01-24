import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../services/api.service';
import * as CommentsActions from './comments.actions';
import { selectCurrentIssueId } from './comments.selectors';

@Injectable()
export class CommentsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private apiService = inject(ApiService);
  private message = inject(NzMessageService);

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.loadComments),
      switchMap((action) =>
        this.apiService.getIssueComments(action.issueId, action.params).pipe(
          map(response => CommentsActions.loadCommentsSuccess({
            comments: response.items,
            totalCount: response.totalItems
          })),
          catchError(error => of(CommentsActions.loadCommentsFailure({
            error: error.error?.message || error.message || 'Eroare la încărcarea comentariilor'
          })))
        )
      )
    )
  );

  // Use concatMap to queue comment actions sequentially
  // - No lost comments (all are queued, unlike exhaustMap which drops actions during in-flight requests)
  // - Critical for issue navigation: user can submit on Issue A, navigate to Issue B, submit there too
  // - Reducer guards already handle stale responses (comments for wrong issueId are discarded)
  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.createComment),
      concatMap((action) =>
        this.apiService.createComment(action.issueId, {
          content: action.content,
          parentCommentId: action.parentCommentId
        }).pipe(
          tap(() => this.message.success('Comentariu adăugat cu succes!')),
          map(comment => CommentsActions.createCommentSuccess({ comment })),
          catchError(error => of(CommentsActions.createCommentFailure({
            error: error.error?.message || error.message || 'Eroare la adăugarea comentariului',
            issueId: action.issueId
          })))
        )
      )
    )
  );

  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.updateComment),
      concatMap((action) =>
        this.apiService.updateComment(action.commentId, { content: action.content }).pipe(
          tap(() => this.message.success('Comentariu actualizat!')),
          map(() => CommentsActions.updateCommentSuccess({
            commentId: action.commentId,
            content: action.content,
            updatedAt: new Date().toISOString()
          })),
          catchError(error => of(CommentsActions.updateCommentFailure({
            error: error.error?.message || error.message || 'Eroare la actualizarea comentariului'
          })))
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.deleteComment),
      concatMap((action) =>
        this.apiService.deleteComment(action.commentId).pipe(
          tap(() => this.message.success('Comentariu șters!')),
          map(() => CommentsActions.deleteCommentSuccess({ commentId: action.commentId })),
          catchError(error => of(CommentsActions.deleteCommentFailure({
            error: error.error?.message || error.message || 'Eroare la ștergerea comentariului'
          })))
        )
      )
    )
  );

  // Use concatMap to queue vote actions sequentially
  // - No lost votes (all are queued, unlike exhaustMap)
  // - No memory leak (unlike groupBy)
  // - Slight serialization is acceptable since vote API calls are fast
  // - "Already voted" errors are treated as success (intended state achieved)
  voteHelpful$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.voteHelpful),
      concatMap((action) =>
        this.apiService.voteCommentHelpful(action.commentId).pipe(
          map(() => CommentsActions.voteHelpfulSuccess({ commentId: action.commentId })),
          catchError(error => {
            // Treat "already voted" as success - the intended state was achieved
            // Check error.error?.message first (API response), then error.message (HttpClient generic)
            const errorMsg = error.error?.message || error.message || '';
            if (errorMsg.toLowerCase().includes('already voted')) {
              return of(CommentsActions.voteHelpfulSuccess({ commentId: action.commentId }));
            }
            return of(CommentsActions.voteHelpfulFailure({
              error: errorMsg || 'Eroare la votare'
            }));
          })
        )
      )
    )
  );

  removeVote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.removeVote),
      concatMap((action) =>
        this.apiService.removeCommentVote(action.commentId).pipe(
          map(() => CommentsActions.removeVoteSuccess({ commentId: action.commentId })),
          catchError(error => {
            // Treat "not voted" / "vote not found" as success - the intended state was achieved
            // Check error.error?.message first (API response), then error.message (HttpClient generic)
            const errorMsg = error.error?.message || error.message || '';
            if (errorMsg.toLowerCase().includes('not voted') ||
                errorMsg.toLowerCase().includes('vote not found') ||
                errorMsg.toLowerCase().includes('no vote')) {
              return of(CommentsActions.removeVoteSuccess({ commentId: action.commentId }));
            }
            return of(CommentsActions.removeVoteFailure({
              error: errorMsg || 'Eroare la anularea votului'
            }));
          })
        )
      )
    )
  );

  showError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CommentsActions.loadCommentsFailure,
        CommentsActions.createCommentFailure,
        CommentsActions.updateCommentFailure,
        CommentsActions.deleteCommentFailure,
        CommentsActions.voteHelpfulFailure,
        CommentsActions.removeVoteFailure
      ),
      withLatestFrom(this.store.select(selectCurrentIssueId)),
      tap(([action, currentIssueId]) => {
        // For actions with issueId (e.g., createCommentFailure), suppress toast if user navigated away
        if ('issueId' in action && action.issueId !== currentIssueId) {
          return;
        }
        this.message.error(action.error);
      })
    ),
    { dispatch: false }
  );
}
