import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../../services/api.service';
import { CategoryColorPipe } from '../../../pipes/category.pipe';
import { UrgencyStatusPipe } from '../../../pipes/urgency.pipe';
import { StatusTextPipe, StatusColorPipe } from '../../../pipes/status.pipe';
import { TimeAgoPipe } from '../../../pipes/date.pipe';
import { ActionLabelPipe, ActionColorPipe, TimelineColorPipe } from '../../../pipes/admin.pipe';
import {
  AdminIssueDetailResponse,
  ApproveIssueRequest,
  RejectIssueRequest
} from '../../../types/civica-api.types';

@Component({
  selector: 'app-admin-issue-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzSpinModule,
    NzGridModule,
    NzDividerModule,
    NzTimelineModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzBadgeModule,
    NzTabsModule,
    CategoryColorPipe,
    UrgencyStatusPipe,
    StatusTextPipe,
    StatusColorPipe,
    TimeAgoPipe,
    ActionLabelPipe,
    ActionColorPipe,
    TimelineColorPipe
  ],
  templateUrl: './admin-issue-detail.component.html',
  styleUrls: ['./admin-issue-detail.component.scss']
})
export class AdminIssueDetailComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  issue: AdminIssueDetailResponse | null = null;
  isLoading = true;
  error: string | null = null;

  // Decision modal
  isDecisionModalVisible = false;
  isProcessing = false;
  decisionForm!: FormGroup;

  constructor() {
    this.decisionForm = this.fb.group({
      decision: ['', [Validators.required]],
      notes: ['']
    });

    this.decisionForm.get('decision')?.valueChanges.subscribe(val => {
      const notesControl = this.decisionForm.get('notes');
      if (val === 'reject') {
        notesControl?.setValidators([Validators.required]);
      } else {
        notesControl?.clearValidators();
      }
      notesControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.loadIssue(issueId);
    } else {
      this.error = 'ID-ul problemei lipsește';
      this.isLoading = false;
    }
  }

  private loadIssue(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getAdminIssueDetail(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (issue) => {
          this.issue = issue;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('[ADMIN] Failed to load issue detail:', err);
          this.error = err.error?.message || 'Nu s-au putut încărca detaliile problemei';
          this.isLoading = false;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/admin/approval']);
  }

  openDecisionModal(): void {
    this.isDecisionModalVisible = true;
    this.decisionForm.reset({ decision: '', notes: '' });
  }

  closeDecisionModal(): void {
    this.isDecisionModalVisible = false;
    this.decisionForm.reset();
  }

  submitDecision(): void {
    if (!this.decisionForm.valid || !this.issue) return;

    const { decision, notes } = this.decisionForm.value;
    const issueId = this.issue.id;

    if (decision !== 'approve' && decision !== 'reject') return;

    this.isProcessing = true;

    if (decision === 'approve') {
      const data: ApproveIssueRequest = { adminNotes: notes || undefined };
      this.apiService.approveIssue(issueId, data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.message.success('Problema a fost aprobata cu succes');
            this.handleDecisionSuccess();
          },
          error: (err) => {
            console.error('[ADMIN] Failed to approve:', err);
            this.message.error('Aprobarea a esuat. Incearca din nou.');
            this.isProcessing = false;
          }
        });
    } else if (decision === 'reject') {
      const data: RejectIssueRequest = {
        reason: notes || 'Nu indeplineste criteriile de aprobare',
        adminNotes: notes || undefined
      };
      this.apiService.rejectIssue(issueId, data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.message.success('Problema a fost respinsa');
            this.handleDecisionSuccess();
          },
          error: (err) => {
            console.error('[ADMIN] Failed to reject:', err);
            this.message.error('Respingerea a esuat. Incearca din nou.');
            this.isProcessing = false;
          }
        });
    }
  }

  private handleDecisionSuccess(): void {
    this.isProcessing = false;
    this.closeDecisionModal();
    this.router.navigate(['/admin/approval']);
  }

  viewPhoto(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
