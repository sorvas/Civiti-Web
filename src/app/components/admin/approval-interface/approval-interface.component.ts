import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// NG-ZORRO imports
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMessageService } from 'ng-zorro-antd/message';

import { 
  MockAdminService, 
  AdminIssue, 
  ApprovalDecision, 
  AdminStats 
} from '../../../services/mock-admin.service';

@Component({
  selector: 'app-approval-interface',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzRadioModule,
    NzSpinModule,
    NzStatisticModule,
    NzGridModule,
    NzBadgeModule,
    NzTypographyModule
  ],
  templateUrl: './approval-interface.component.html',
  styleUrls: ['./approval-interface.component.scss']
})
export class ApprovalInterfaceComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  pendingIssues: AdminIssue[] = [];
  adminStats: AdminStats | null = null;
  departments: string[] = [];
  isLoading = false;
  isProcessing = false;

  // Modal state
  isApprovalModalVisible = false;
  selectedIssue: AdminIssue | null = null;
  approvalForm!: FormGroup;

  constructor(
    private adminService: MockAdminService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.approvalForm = this.fb.group({
      decision: ['', [Validators.required]],
      priority: ['medium'],
      assignedDepartment: [''],
      notes: ['']
    });
  }

  private loadData(): void {
    this.isLoading = true;

    // Load pending issues
    this.adminService.getPendingIssues()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (issues) => {
          this.pendingIssues = issues;
          console.log('[ADMIN] Loaded pending issues:', issues.length);
        },
        error: (error) => {
          console.error('[ADMIN] Failed to load pending issues:', error);
          this.message.error('Failed to load pending issues');
        }
      });

    // Load admin stats
    this.adminService.getAdminStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.adminStats = stats;
          console.log('[ADMIN] Loaded admin stats:', stats);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('[ADMIN] Failed to load admin stats:', error);
          this.message.error('Failed to load statistics');
          this.isLoading = false;
        }
      });

    // Load departments
    this.adminService.getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (departments) => {
          this.departments = departments;
        },
        error: (error) => {
          console.error('[ADMIN] Failed to load departments:', error);
        }
      });
  }

  refreshData(): void {
    console.log('[ADMIN] Refreshing data...');
    this.loadData();
    this.message.info('Data refreshed');
  }

  getCategoryColor(categoryId: string): string {
    const colors: { [key: string]: string } = {
      'infrastructure': 'orange',
      'environment': 'green',
      'transportation': 'blue',
      'public-services': 'purple',
      'safety': 'red',
      'other': 'default'
    };
    return colors[categoryId] || 'default';
  }

  getUrgencyStatus(urgency: string): 'default' | 'processing' | 'success' | 'error' | 'warning' {
    const statuses: { [key: string]: 'default' | 'processing' | 'success' | 'error' | 'warning' } = {
      'low': 'default',
      'medium': 'processing',
      'high': 'warning',
      'urgent': 'error'
    };
    return statuses[urgency] || 'default';
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  }

  viewIssueDetails(issue: AdminIssue): void {
    console.log('[ADMIN] View issue details:', issue.id);
    // TODO: Open detailed view modal or navigate to details page
    this.openApprovalModal(issue);
  }

  openApprovalModal(issue: AdminIssue): void {
    console.log('[ADMIN] Open approval modal for issue:', issue.id);
    this.selectedIssue = issue;
    this.isApprovalModalVisible = true;
    
    // Reset form
    this.approvalForm.reset({
      decision: '',
      priority: 'medium',
      assignedDepartment: '',
      notes: ''
    });
  }

  closeApprovalModal(): void {
    this.isApprovalModalVisible = false;
    this.selectedIssue = null;
    this.approvalForm.reset();
  }

  viewPhoto(photoUrl: string): void {
    console.log('[ADMIN] View photo:', photoUrl);
    // Open photo in new tab/window
    window.open(photoUrl, '_blank');
  }

  submitDecision(): void {
    if (!this.approvalForm.valid || !this.selectedIssue) {
      this.message.warning('Please fill in all required fields');
      return;
    }

    const formValue = this.approvalForm.value;
    const decision: ApprovalDecision = {
      issueId: this.selectedIssue.id!,
      decision: formValue.decision,
      notes: formValue.notes,
      priority: formValue.priority,
      assignedDepartment: formValue.assignedDepartment,
      publicVisibility: formValue.decision === 'approve',
      adminId: 'admin-001' // Mock admin ID
    };

    console.log('[ADMIN] Submitting approval decision:', decision);
    this.isProcessing = true;

    this.adminService.processApprovalDecision(decision)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          console.log('[ADMIN] Decision processed successfully:', result);
          
          const actionText = decision.decision === 'approve' ? 'approved' : 
                           decision.decision === 'reject' ? 'rejected' : 'updated';
          
          this.message.success(`Issue ${actionText} successfully`);
          
          // Remove processed issue from pending list
          this.pendingIssues = this.pendingIssues.filter(issue => issue.id !== decision.issueId);
          
          // Update stats
          if (this.adminStats) {
            this.adminStats.pendingReview--;
            if (decision.decision === 'approve') {
              this.adminStats.approvedToday++;
            } else if (decision.decision === 'reject') {
              this.adminStats.rejectedToday++;
            }
          }

          this.closeApprovalModal();
          this.isProcessing = false;
        },
        error: (error) => {
          console.error('[ADMIN] Failed to process decision:', error);
          this.message.error('Failed to process decision. Please try again.');
          this.isProcessing = false;
        }
      });
  }
}