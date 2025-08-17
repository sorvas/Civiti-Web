import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IssueState, issueAdapter } from './issue.state';
import { IssueItem } from '../../types/civica-api.types';

export const selectIssueState = createFeatureSelector<IssueState>('issues');

// Entity selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = issueAdapter.getSelectors(selectIssueState);

// Custom selectors
export const selectIssuesLoading = createSelector(
  selectIssueState,
  (state: IssueState) => state.loading
);

export const selectIssuesError = createSelector(
  selectIssueState,
  (state: IssueState) => state.error
);

export const selectSortBy = createSelector(
  selectIssueState,
  (state: IssueState) => state.sortBy
);

export const selectSelectedIssueId = createSelector(
  selectIssueState,
  (state: IssueState) => state.selectedIssueId
);

export const selectSelectedIssue = createSelector(
  selectIssueState,
  (state: IssueState) => state.selectedIssueDetail
);

// Sorted issues selector
export const selectSortedIssues = createSelector(
  selectAll,
  selectSortBy,
  (issues: IssueItem[], sortBy: string) => {
    const sortedIssues = [...issues];
    
    switch (sortBy) {
      case 'emails':
        return sortedIssues.sort((a, b) => b.emailCount - a.emailCount);
      
      case 'urgency':
        return sortedIssues.sort((a, b) => {
          const urgencyA = getUrgencyScore(a);
          const urgencyB = getUrgencyScore(b);
          return urgencyB - urgencyA;
        });
      
      default: // 'date'
        return sortedIssues.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }
);

// Helper function for urgency calculation
function getUrgencyScore(issue: IssueItem): number {
  const daysSince = Math.ceil(
    Math.abs(new Date().getTime() - new Date(issue.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  const emailRatio = issue.emailCount / 100;
  return emailRatio + (daysSince / 10);
}