import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Import real API service and types
import { ApiService } from './api.service';
import { 
  CreateUserProfileRequest,
  UpdateUserProfileRequest, 
  UserProfileResponse,
  CreateIssueRequest,
  CreateIssueResponse,
  IssueListItem,
  IssueDetailResponse,
  TrackEmailRequest,
  TrackEmailResponse,
  UserFullProfileResponse,
  Badge,
  LeaderboardResponse,
  AdminIssueListItem,
  AdminIssueDetailResponse,
  ApproveIssueRequest,
  RejectIssueRequest,
  RequestChangesRequest,
  BulkApproveRequest,
  BulkApproveResponse,
  IssueActionResponse,
  AdminStatisticsResponse,
  PagedResult,
  IssueQueryParams,
  LeaderboardQueryParams,
  PaginationParams,
  HealthResponse
} from '../../docs/integration/civica-api-types';

// Import mock services
import { MockUserService } from './mock-user.service';
import { MockIssueCreationService } from './mock-issue-creation.service';
import { MockAdminService } from './mock-admin.service';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  constructor(
    private apiService: ApiService,
    private mockUserService: MockUserService,
    private mockIssueService: MockIssueCreationService,
    private mockAdminService: MockAdminService
  ) {}

  // ============================================
  // Health Check
  // ============================================

  checkHealth(): Observable<HealthResponse> {
    if (environment.mockMode) {
      return of({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0-mock',
        database: 'connected (mock)',
        supabase: 'connected (mock)'
      });
    }

    return this.apiService.getHealth().pipe(
      catchError(error => {
        console.error('Health check failed:', error);
        return throwError(() => error);
      })
    );
  }

  // ============================================
  // User Profile Management
  // ============================================

  createUserProfile(data: CreateUserProfileRequest): Observable<UserProfileResponse> {
    if (environment.mockMode) {
      // Convert to mock format and create profile
      return this.mockUserService.createProfile({
        email: data.email,
        displayName: data.displayName,
        location: {
          county: data.county,
          city: data.city,
          district: data.district || ''
        }
      }).pipe(
        map(mockProfile => this.convertMockToApiProfile(mockProfile))
      );
    }

    return this.apiService.createUserProfile(data).pipe(
      catchError(error => {
        console.error('Create profile failed:', error);
        return throwError(() => error);
      })
    );
  }

  getUserProfile(): Observable<UserProfileResponse> {
    if (environment.mockMode) {
      return this.mockUserService.getProfile().pipe(
        map(mockProfile => this.convertMockToApiProfile(mockProfile))
      );
    }

    return this.apiService.getUserProfile().pipe(
      catchError(error => {
        console.error('Get profile failed:', error);
        return throwError(() => error);
      })
    );
  }

  updateUserProfile(data: UpdateUserProfileRequest): Observable<UserProfileResponse> {
    if (environment.mockMode) {
      return this.mockUserService.updateProfile(data).pipe(
        map(mockProfile => this.convertMockToApiProfile(mockProfile))
      );
    }

    return this.apiService.updateUserProfile(data).pipe(
      catchError(error => {
        console.error('Update profile failed:', error);
        return throwError(() => error);
      })
    );
  }

  // ============================================
  // Issues Management
  // ============================================

  getIssues(params?: IssueQueryParams): Observable<PagedResult<IssueListItem>> {
    if (environment.mockMode) {
      // Mock implementation would need to be adapted to return PagedResult format
      return this.mockIssueService.getIssues().pipe(
        map(mockIssues => ({
          items: mockIssues.slice(0, params?.pageSize || 12),
          totalCount: mockIssues.length,
          page: params?.page || 1,
          pageSize: params?.pageSize || 12,
          totalPages: Math.ceil(mockIssues.length / (params?.pageSize || 12))
        }))
      );
    }

    return this.apiService.getIssues(params).pipe(
      catchError(error => {
        console.error('Get issues failed:', error);
        return throwError(() => error);
      })
    );
  }

  getIssueById(id: string): Observable<IssueDetailResponse> {
    if (environment.mockMode) {
      return this.mockIssueService.getIssueById(id).pipe(
        map(mockIssue => this.convertMockToApiIssue(mockIssue))
      );
    }

    return this.apiService.getIssueById(id).pipe(
      catchError(error => {
        console.error('Get issue detail failed:', error);
        return throwError(() => error);
      })
    );
  }

  createIssue(data: CreateIssueRequest): Observable<CreateIssueResponse> {
    if (environment.mockMode) {
      return this.mockIssueService.createIssue({
        title: data.title,
        description: data.description,
        category: {
          id: data.category,
          name: data.category,
          description: '',
          icon: '',
          examples: []
        },
        photos: [],
        location: {
          county: data.county,
          city: data.city,
          district: data.district,
          address: data.address,
          coordinates: data.latitude && data.longitude ? {
            latitude: data.latitude,
            longitude: data.longitude
          } : undefined
        },
        urgency: data.urgency,
        status: 'submitted',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'mock-user'
      }).pipe(
        map(mockIssue => ({
          id: mockIssue.id || 'mock-id',
          message: 'Issue created successfully',
          status: 'pending_approval' as const
        }))
      );
    }

    return this.apiService.createIssue(data).pipe(
      catchError(error => {
        console.error('Create issue failed:', error);
        return throwError(() => error);
      })
    );
  }

  trackEmailSent(issueId: string, data: TrackEmailRequest): Observable<TrackEmailResponse> {
    if (environment.mockMode) {
      return of({
        success: true,
        message: 'Email tracked successfully (mock)',
        pointsEarned: 10,
        newTotalEmails: Math.floor(Math.random() * 100) + 1
      });
    }

    return this.apiService.trackEmailSent(issueId, data).pipe(
      catchError(error => {
        console.error('Track email failed:', error);
        return throwError(() => error);
      })
    );
  }

  // ============================================
  // User Dashboard
  // ============================================

  getUserFullProfile(): Observable<UserFullProfileResponse> {
    if (environment.mockMode) {
      return this.mockUserService.getProfile().pipe(
        switchMap(profile => 
          this.mockUserService.getGamificationData().pipe(
            map(gamification => ({
              profile: this.convertMockToApiProfile(profile),
              gamification: {
                totalPoints: gamification.points,
                currentLevel: gamification.level,
                pointsToNextLevel: 100 - (gamification.points % 100),
                rank: gamification.leaderboardPosition?.overall || 0,
                recentBadges: gamification.badges.slice(-5).map(badge => ({
                  id: badge.id,
                  name: badge.name,
                  description: badge.description,
                  imageUrl: badge.iconUrl,
                  tier: 'bronze' as const,
                  pointValue: 10,
                  earnedAt: badge.earnedAt.toISOString()
                })),
                activeAchievements: gamification.achievements.map(achievement => ({
                  id: achievement.id,
                  name: achievement.title,
                  description: achievement.description,
                  progress: achievement.progress,
                  target: achievement.maxProgress,
                  pointReward: achievement.reward.points
                }))
              }
            }))
          )
        )
      );
    }

    return this.apiService.getUserFullProfile().pipe(
      catchError(error => {
        console.error('Get user full profile failed:', error);
        return throwError(() => error);
      })
    );
  }

  getUserIssues(params?: IssueQueryParams): Observable<PagedResult<IssueListItem>> {
    if (environment.mockMode) {
      // Mock would return user's issues only
      return this.getIssues(params);
    }

    return this.apiService.getUserIssues(params).pipe(
      catchError(error => {
        console.error('Get user issues failed:', error);
        return throwError(() => error);
      })
    );
  }

  // ============================================
  // Gamification
  // ============================================

  getBadges(): Observable<Badge[]> {
    if (environment.mockMode) {
      return this.mockUserService.getGamificationData().pipe(
        map(gamification => 
          gamification.badges.map(badge => ({
            id: badge.id,
            name: badge.name,
            description: badge.description,
            imageUrl: badge.iconUrl,
            tier: 'bronze' as const,
            pointValue: 10,
            requirement: 'Complete various actions'
          }))
        )
      );
    }

    return this.apiService.getBadges().pipe(
      catchError(error => {
        console.error('Get badges failed:', error);
        return throwError(() => error);
      })
    );
  }

  getLeaderboard(params?: LeaderboardQueryParams): Observable<LeaderboardResponse> {
    if (environment.mockMode) {
      return of({
        leaderboard: [
          {
            rank: 1,
            userId: 'user-1',
            displayName: 'Ion Popescu',
            points: 1250,
            level: 5,
            emailsSent: 45,
            issuesCreated: 12,
            badgeCount: 8
          },
          {
            rank: 2, 
            userId: 'user-2',
            displayName: 'Maria Ionescu',
            points: 980,
            level: 4,
            emailsSent: 32,
            issuesCreated: 8,
            badgeCount: 6
          }
        ],
        period: params?.period || 'all-time',
        category: params?.category || 'points',
        totalEntries: 150,
        generatedAt: new Date().toISOString()
      });
    }

    return this.apiService.getLeaderboard(params).pipe(
      catchError(error => {
        console.error('Get leaderboard failed:', error);
        return throwError(() => error);
      })
    );
  }

  // ============================================
  // Admin Functions
  // ============================================

  getPendingIssues(params?: PaginationParams): Observable<PagedResult<AdminIssueListItem>> {
    if (environment.mockMode) {
      return this.mockAdminService.getPendingIssues().pipe(
        map(mockIssues => ({
          items: mockIssues.map(issue => ({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            category: issue.category as any,
            urgency: issue.urgency as any,
            location: `${issue.location.city}, ${issue.location.county}`,
            submittedBy: issue.submittedBy,
            submittedAt: issue.submittedAt.toISOString(),
            photoCount: issue.photos?.length || 0,
            status: 'pending_approval' as const
          })),
          totalCount: mockIssues.length,
          page: params?.page || 1,
          pageSize: params?.pageSize || 20,
          totalPages: Math.ceil(mockIssues.length / (params?.pageSize || 20))
        }))
      );
    }

    return this.apiService.getPendingIssues(params).pipe(
      catchError(error => {
        console.error('Get pending issues failed:', error);
        return throwError(() => error);
      })
    );
  }

  approveIssue(id: string, data: ApproveIssueRequest): Observable<IssueActionResponse> {
    if (environment.mockMode) {
      return this.mockAdminService.approveIssue(id, {
        adminNotes: data.adminNotes
      }).pipe(
        map(() => ({
          success: true,
          message: 'Issue approved successfully',
          issueId: id,
          approvedAt: new Date().toISOString()
        }))
      );
    }

    return this.apiService.approveIssue(id, data).pipe(
      catchError(error => {
        console.error('Approve issue failed:', error);
        return throwError(() => error);
      })
    );
  }

  // ============================================
  // Helper Methods
  // ============================================

  private convertMockToApiProfile(mockProfile: any): UserProfileResponse {
    return {
      id: mockProfile.id,
      supabaseUserId: 'mock-supabase-id',
      email: mockProfile.email,
      displayName: mockProfile.displayName,
      county: mockProfile.location.county,
      city: mockProfile.location.city,
      district: mockProfile.location.district,
      residenceType: 'urban',
      points: mockProfile.gamification?.points || 0,
      level: mockProfile.gamification?.level || 1,
      createdAt: mockProfile.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: mockProfile.lastActive?.toISOString() || new Date().toISOString()
    };
  }

  private convertMockToApiIssue(mockIssue: any): IssueDetailResponse {
    return {
      id: mockIssue.id,
      title: mockIssue.title,
      description: mockIssue.description,
      category: mockIssue.category.id,
      urgency: mockIssue.urgency,
      county: mockIssue.location.county,
      city: mockIssue.location.city,
      district: mockIssue.location.district,
      address: mockIssue.location.address,
      latitude: mockIssue.location.coordinates?.latitude,
      longitude: mockIssue.location.coordinates?.longitude,
      photoUrls: mockIssue.photos.map((p: any) => p.url),
      emailCount: Math.floor(Math.random() * 100),
      uniqueEmailers: Math.floor(Math.random() * 50),
      status: mockIssue.status,
      createdAt: mockIssue.createdAt.toISOString(),
      submitterName: 'Mock User'
    };
  }
}