import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IssueCreationData } from './mock-issue-creation.service';

export interface AdminIssue extends IssueCreationData {
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  adminNotes?: string;
  rejectionReason?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedResolutionTime?: string;
  assignedDepartment?: string;
  publicVisibility: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'moderator' | 'reviewer';
  department: string;
  permissions: AdminPermission[];
  lastActive: Date;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  scope: 'issues' | 'users' | 'system' | 'reports';
}

export interface ApprovalDecision {
  issueId: string;
  decision: 'approve' | 'reject' | 'request_changes';
  notes?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignedDepartment?: string;
  estimatedResolutionTime?: string;
  publicVisibility?: boolean;
  adminId: string;
}

export interface AdminStats {
  totalSubmissions: number;
  pendingReview: number;
  approvedToday: number;
  rejectedToday: number;
  averageReviewTime: number; // in hours
  categoryBreakdown: { [category: string]: number };
  urgencyBreakdown: { [urgency: string]: number };
  approvalRate: number; // percentage
}

@Injectable({
  providedIn: 'root'
})
export class MockAdminService {
  private readonly STORAGE_KEYS = {
    PENDING_ISSUES: 'civica_admin_pending',
    REVIEWED_ISSUES: 'civica_admin_reviewed',
    ADMIN_USERS: 'civica_admin_users',
    ADMIN_SETTINGS: 'civica_admin_settings'
  };

  private mockAdminUser: AdminUser = {
    id: 'admin-001',
    email: 'admin@civica.ro',
    displayName: 'Alexandra Popescu',
    role: 'admin',
    department: 'Municipal Administration',
    permissions: [
      {
        id: 'approve_issues',
        name: 'Approve Issues',
        description: 'Can approve or reject submitted issues',
        scope: 'issues'
      },
      {
        id: 'manage_users',
        name: 'Manage Users',
        description: 'Can manage user accounts and permissions',
        scope: 'users'
      },
      {
        id: 'view_reports',
        name: 'View Reports',
        description: 'Can access administrative reports and analytics',
        scope: 'reports'
      }
    ],
    lastActive: new Date()
  };

  private departments = [
    'Municipal Administration',
    'Infrastructure & Public Works',
    'Environmental Services',
    'Transportation Department',
    'Public Safety',
    'Community Services'
  ];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Initialize storage if empty
    Object.values(this.STORAGE_KEYS).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, '{}');
      }
    });

    // Create some mock pending issues
    this.createMockPendingIssues();
  }

  private createMockPendingIssues(): void {
    const pendingIssues = this.getPendingIssues();
    
    if (Object.keys(pendingIssues).length === 0) {
      // Create mock pending issues
      const mockIssues: AdminIssue[] = [
        {
          id: 'issue-pending-001',
          title: 'Broken Street Light on Strada Libertății',
          description: 'The street light has been non-functional for over a week, creating safety concerns for pedestrians walking at night.',
          category: {
            id: 'infrastructure',
            name: 'Infrastructure',
            description: 'Roads, sidewalks, utilities',
            icon: '🚧',
            examples: ['Street lighting', 'Road maintenance', 'Utilities']
          },
          photos: [
            {
              id: 'photo-001',
              url: '/assets/mock/issue-streetlight.jpg',
              thumbnail: '/assets/mock/issue-streetlight-thumb.jpg',
              quality: 'high',
              timestamp: new Date(),
              metadata: {
                size: 1024000,
                dimensions: { width: 1920, height: 1080 },
                format: 'image/jpeg'
              }
            }
          ],
          location: {
            address: 'Strada Libertății nr. 23, Sector 5, București',
            coordinates: { lat: 44.4268, lng: 26.1025 },
            accuracy: 10,
            neighborhood: 'Rahova'
          },
          urgency: 'high',
          status: 'submitted',
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          priority: 'high',
          publicVisibility: true,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          userId: 'user-001',
          aiGeneratedText: {
            description: 'There is a significant street lighting issue on Strada Libertății that affects pedestrian safety during evening hours.',
            proposedSolution: 'The municipal infrastructure team should replace the faulty street light fixture with a modern LED unit to ensure proper illumination.',
            confidence: 0.89
          }
        },
        {
          id: 'issue-pending-002',
          title: 'Illegal Garbage Dumping in Park',
          description: 'Large amounts of household waste have been illegally dumped near the playground area, posing health risks to children.',
          category: {
            id: 'environment',
            name: 'Environment',
            description: 'Parks, pollution, cleanliness',
            icon: '🌳',
            examples: ['Illegal dumping', 'Park maintenance', 'Pollution']
          },
          photos: [
            {
              id: 'photo-002',
              url: '/assets/mock/issue-garbage.jpg',
              thumbnail: '/assets/mock/issue-garbage-thumb.jpg',
              quality: 'medium',
              timestamp: new Date(),
              metadata: {
                size: 756000,
                dimensions: { width: 1280, height: 720 },
                format: 'image/jpeg'
              }
            }
          ],
          location: {
            address: 'Parcul Copiilor, Strada Primăverii, Sector 5',
            coordinates: { lat: 44.4150, lng: 26.0800 },
            accuracy: 15,
            neighborhood: 'Cotroceni'
          },
          urgency: 'urgent',
          status: 'submitted',
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          priority: 'critical',
          publicVisibility: true,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          userId: 'user-002'
        }
      ];

      const pendingStorage: { [id: string]: AdminIssue } = {};
      mockIssues.forEach(issue => {
        pendingStorage[issue.id!] = issue;
      });

      localStorage.setItem(this.STORAGE_KEYS.PENDING_ISSUES, JSON.stringify(pendingStorage));
    }
  }

  getPendingIssues(): Observable<AdminIssue[]> {
    console.log('[MOCK ADMIN] Loading pending issues...');
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const pendingIssues = this.getPendingIssuesFromStorage();
        return Object.values(pendingIssues).sort((a, b) => 
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
      })
    );
  }

  getIssueById(issueId: string): Observable<AdminIssue | null> {
    console.log('[MOCK ADMIN] Loading issue:', issueId);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const pendingIssues = this.getPendingIssuesFromStorage();
        const reviewedIssues = this.getReviewedIssuesFromStorage();
        
        return pendingIssues[issueId] || reviewedIssues[issueId] || null;
      })
    );
  }

  processApprovalDecision(decision: ApprovalDecision): Observable<{ success: boolean; issue: AdminIssue }> {
    console.log('[MOCK ADMIN] Processing approval decision:', decision);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const pendingIssues = this.getPendingIssuesFromStorage();
        const reviewedIssues = this.getReviewedIssuesFromStorage();
        
        const issue = pendingIssues[decision.issueId];
        if (!issue) {
          throw new Error('Issue not found in pending queue');
        }

        // Update issue with admin decision
        const updatedIssue: AdminIssue = {
          ...issue,
          status: decision.decision === 'approve' ? 'approved' : 
                 decision.decision === 'reject' ? 'rejected' : 'under_review',
          reviewedAt: new Date(),
          reviewedBy: decision.adminId,
          adminNotes: decision.notes,
          rejectionReason: decision.decision === 'reject' ? decision.notes : undefined,
          priority: decision.priority || issue.priority,
          assignedDepartment: decision.assignedDepartment,
          estimatedResolutionTime: decision.estimatedResolutionTime,
          publicVisibility: decision.publicVisibility ?? issue.publicVisibility,
          updatedAt: new Date()
        };

        // Move from pending to reviewed
        delete pendingIssues[decision.issueId];
        reviewedIssues[decision.issueId] = updatedIssue;

        // Save changes
        localStorage.setItem(this.STORAGE_KEYS.PENDING_ISSUES, JSON.stringify(pendingIssues));
        localStorage.setItem(this.STORAGE_KEYS.REVIEWED_ISSUES, JSON.stringify(reviewedIssues));

        console.log('[MOCK ADMIN] Decision processed successfully:', updatedIssue);
        
        return { success: true, issue: updatedIssue };
      })
    );
  }

  getAdminStats(): Observable<AdminStats> {
    console.log('[MOCK ADMIN] Loading admin statistics...');
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const pendingIssues = Object.values(this.getPendingIssuesFromStorage());
        const reviewedIssues = Object.values(this.getReviewedIssuesFromStorage());
        const allIssues = [...pendingIssues, ...reviewedIssues];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const approvedToday = reviewedIssues.filter(issue => 
          issue.status === 'approved' && 
          issue.reviewedAt && 
          new Date(issue.reviewedAt) >= today
        ).length;

        const rejectedToday = reviewedIssues.filter(issue => 
          issue.status === 'rejected' && 
          issue.reviewedAt && 
          new Date(issue.reviewedAt) >= today
        ).length;

        // Calculate category breakdown
        const categoryBreakdown: { [category: string]: number } = {};
        allIssues.forEach(issue => {
          const category = issue.category.name;
          categoryBreakdown[category] = (categoryBreakdown[category] || 0) + 1;
        });

        // Calculate urgency breakdown
        const urgencyBreakdown: { [urgency: string]: number } = {};
        allIssues.forEach(issue => {
          urgencyBreakdown[issue.urgency] = (urgencyBreakdown[issue.urgency] || 0) + 1;
        });

        // Calculate approval rate
        const totalReviewed = reviewedIssues.length;
        const totalApproved = reviewedIssues.filter(issue => issue.status === 'approved').length;
        const approvalRate = totalReviewed > 0 ? (totalApproved / totalReviewed) * 100 : 0;

        // Calculate average review time
        const reviewTimes = reviewedIssues
          .filter(issue => issue.reviewedAt)
          .map(issue => {
            const submitted = new Date(issue.submittedAt).getTime();
            const reviewed = new Date(issue.reviewedAt!).getTime();
            return (reviewed - submitted) / (1000 * 60 * 60); // hours
          });
        
        const averageReviewTime = reviewTimes.length > 0 
          ? reviewTimes.reduce((sum, time) => sum + time, 0) / reviewTimes.length 
          : 0;

        const stats: AdminStats = {
          totalSubmissions: allIssues.length,
          pendingReview: pendingIssues.length,
          approvedToday,
          rejectedToday,
          averageReviewTime: Math.round(averageReviewTime * 10) / 10,
          categoryBreakdown,
          urgencyBreakdown,
          approvalRate: Math.round(approvalRate * 10) / 10
        };

        console.log('[MOCK ADMIN] Stats calculated:', stats);
        return stats;
      })
    );
  }

  getReviewedIssues(limit?: number, status?: 'approved' | 'rejected'): Observable<AdminIssue[]> {
    console.log('[MOCK ADMIN] Loading reviewed issues...');
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const reviewedIssues = Object.values(this.getReviewedIssuesFromStorage());
        
        let filteredIssues = reviewedIssues;
        if (status) {
          filteredIssues = reviewedIssues.filter(issue => issue.status === status);
        }

        // Sort by review date (newest first)
        filteredIssues.sort((a, b) => {
          const dateA = a.reviewedAt ? new Date(a.reviewedAt).getTime() : 0;
          const dateB = b.reviewedAt ? new Date(b.reviewedAt).getTime() : 0;
          return dateB - dateA;
        });

        if (limit) {
          filteredIssues = filteredIssues.slice(0, limit);
        }

        return filteredIssues;
      })
    );
  }

  getCurrentAdmin(): Observable<AdminUser> {
    console.log('[MOCK ADMIN] Loading current admin user...');
    
    return of(this.mockAdminUser).pipe(
      delay(200)
    );
  }

  getDepartments(): Observable<string[]> {
    return of(this.departments).pipe(
      delay(100)
    );
  }

  // Bulk operations
  bulkApprove(issueIds: string[], adminId: string): Observable<{ successCount: number; failureCount: number }> {
    console.log('[MOCK ADMIN] Bulk approving issues:', issueIds);
    
    return of(null).pipe(
      delay(this.getRandomDelay() * 2), // Longer delay for bulk operation
      map(() => {
        let successCount = 0;
        let failureCount = 0;

        issueIds.forEach(issueId => {
          try {
            const decision: ApprovalDecision = {
              issueId,
              decision: 'approve',
              notes: 'Bulk approved by administrator',
              adminId,
              publicVisibility: true
            };
            
            // Process each decision synchronously for this mock
            const pendingIssues = this.getPendingIssuesFromStorage();
            const reviewedIssues = this.getReviewedIssuesFromStorage();
            
            if (pendingIssues[issueId]) {
              const issue = pendingIssues[issueId];
              const updatedIssue: AdminIssue = {
                ...issue,
                status: 'approved',
                reviewedAt: new Date(),
                reviewedBy: adminId,
                adminNotes: 'Bulk approved by administrator',
                publicVisibility: true,
                updatedAt: new Date()
              };

              delete pendingIssues[issueId];
              reviewedIssues[issueId] = updatedIssue;
              successCount++;
            } else {
              failureCount++;
            }
          } catch (error) {
            failureCount++;
          }
        });

        // Save changes
        const pendingIssues = this.getPendingIssuesFromStorage();
        const reviewedIssues = this.getReviewedIssuesFromStorage();
        localStorage.setItem(this.STORAGE_KEYS.PENDING_ISSUES, JSON.stringify(pendingIssues));
        localStorage.setItem(this.STORAGE_KEYS.REVIEWED_ISSUES, JSON.stringify(reviewedIssues));

        return { successCount, failureCount };
      })
    );
  }

  // Private helper methods
  private getPendingIssuesFromStorage(): { [id: string]: AdminIssue } {
    const data = localStorage.getItem(this.STORAGE_KEYS.PENDING_ISSUES);
    return data ? JSON.parse(data) : {};
  }

  private getReviewedIssuesFromStorage(): { [id: string]: AdminIssue } {
    const data = localStorage.getItem(this.STORAGE_KEYS.REVIEWED_ISSUES);
    return data ? JSON.parse(data) : {};
  }

  private getRandomDelay(): number {
    return Math.random() * 400 + 300; // 300-700ms
  }
}