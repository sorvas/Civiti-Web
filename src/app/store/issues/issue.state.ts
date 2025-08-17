import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IssueItem, IssueDetailResponse } from '../../types/civica-api.types';

export interface IssueState extends EntityState<IssueItem> {
  selectedIssueId: string | null;
  selectedIssueDetail: IssueDetailResponse | null;
  loading: boolean;
  error: string | null;
  sortBy: 'date' | 'emails' | 'urgency';
}

export const issueAdapter: EntityAdapter<IssueItem> = createEntityAdapter<IssueItem>({
  selectId: (issue: IssueItem) => issue.id,
  sortComparer: false
});

export const initialIssueState: IssueState = issueAdapter.getInitialState({
  selectedIssueId: null,
  selectedIssueDetail: null,
  loading: false,
  error: null,
  sortBy: 'date'
});