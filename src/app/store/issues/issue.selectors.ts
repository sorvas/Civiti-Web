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

// Issues selector - server handles sorting, so just return as-is
export const selectSortedIssues = selectAll;