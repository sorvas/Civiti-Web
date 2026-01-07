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

// Pagination selectors
export const selectCurrentPage = createSelector(
  selectIssueState,
  (state: IssueState) => state.currentPage
);

export const selectPageSize = createSelector(
  selectIssueState,
  (state: IssueState) => state.pageSize
);

export const selectTotalItems = createSelector(
  selectIssueState,
  (state: IssueState) => state.totalItems
);

export const selectTotalPages = createSelector(
  selectIssueState,
  (state: IssueState) => state.totalPages
);

// Combined pagination info for template
export const selectPaginationInfo = createSelector(
  selectCurrentPage,
  selectPageSize,
  selectTotalItems,
  selectTotalPages,
  (currentPage, pageSize, totalItems, totalPages) => ({
    currentPage,
    pageSize,
    totalCount: totalItems,
    totalPages,
    startItem: totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0,
    endItem: Math.min(currentPage * pageSize, totalItems)
  })
);

// Sorted issues selector
export const selectSortedIssues = createSelector(
  selectAll,
  selectSortBy,
  (issues: IssueItem[], sortBy: string): IssueItem[] => {
    if (!issues?.length) return [];

    return [...issues].sort((a, b) => {
      switch (sortBy) {
        case 'emails':
          return (b.emailsSent || 0) - (a.emailsSent || 0);
        case 'urgency':
          return getUrgencyScore(b) - getUrgencyScore(a);
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }
);

// Helper function for urgency calculation
function getUrgencyScore(issue: IssueItem): number {
  const daysSince = Math.ceil(
    Math.abs(new Date().getTime() - new Date(issue.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  const emailRatio = (issue.emailsSent || 0) / 100;
  return emailRatio + (daysSince / 10);
}