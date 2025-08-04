import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { 
  UserProfile, 
  GamificationData, 
  UserPreferences, 
  Badge, 
  Achievement, 
  UserStats,
  Streaks,
  LeaderboardPosition 
} from '../store/user/user.state';

@Injectable({
  providedIn: 'root'  
})
export class MockUserService {
  private readonly STORAGE_KEY = 'civica_user_data';

  private mockBadges: Badge[] = [
    {
      id: 'civic-starter',
      name: 'Civic Starter',
      description: 'Reported your first community issue',
      iconUrl: '/assets/badges/civic-starter.svg',
      category: 'starter',
      earnedAt: new Date(),
      rarity: 'common'
    },
    {
      id: 'picture-perfect',
      name: 'Picture Perfect',
      description: 'Uploaded high-quality photos with your report',
      iconUrl: '/assets/badges/picture-perfect.svg',
      category: 'progress',
      earnedAt: new Date(),
      rarity: 'uncommon'
    },
    {
      id: 'community-voice',
      name: 'Community Voice',
      description: 'Voted on 10 community issues',
      iconUrl: '/assets/badges/community-voice.svg',
      category: 'progress',
      earnedAt: new Date(),
      rarity: 'common'
    },
    {
      id: 'problem-solver',
      name: 'Problem Solver',
      description: '3 of your issues have been resolved',
      iconUrl: '/assets/badges/problem-solver.svg',
      category: 'achievement',
      earnedAt: new Date(),
      rarity: 'rare'
    }
  ];

  private mockAchievements: Achievement[] = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Report your first issue',
      progress: 100,
      maxProgress: 1,
      completed: true,
      completedAt: new Date(),
      reward: { points: 50, badge: 'civic-starter' }
    },
    {
      id: 'community-champion',
      title: 'Community Champion',
      description: 'Report 10 issues',
      progress: 4,
      maxProgress: 10,
      completed: false,
      reward: { points: 200, badge: 'community-champion' }
    },
    {
      id: 'quality-contributor',
      title: 'Quality Contributor',
      description: 'Maintain 90% approval rate with 5+ submissions',
      progress: 80,
      maxProgress: 90,
      completed: false,
      reward: { points: 300, badge: 'quality-contributor' }
    },
    {
      id: 'social-connector',
      title: 'Social Connector',
      description: 'Vote on 50 community issues',
      progress: 23,
      maxProgress: 50,
      completed: false,
      reward: { points: 150 }
    }
  ];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const mockData = {
        profiles: {},
        gamification: {},
        preferences: {}
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockData));
    }
  }

  getUserProfile(userId: string): Observable<UserProfile> {
    console.log('[MOCK USER] Loading profile for user:', userId);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const data = this.getStoredData();
        
        if (data.profiles[userId]) {
          return data.profiles[userId];
        }

        // Create mock profile for new user
        const profile: UserProfile = {
          id: userId,
          email: 'user@civica.ro',
          displayName: 'Ion Popescu',
          photoURL: '/assets/mock/avatar-default.jpg',
          location: {
            county: 'București',
            city: 'București',
            district: 'Sector 5'
          },
          profile: {
            residenceType: 'apartment',
            communicationPrefs: {
              issueUpdates: true,
              communityNews: true,
              monthlyDigest: false,
              achievements: true
            }
          },
          createdAt: new Date(),
          lastActive: new Date(),
          emailVerified: true
        };

        data.profiles[userId] = profile;
        this.saveStoredData(data);
        
        return profile;
      })
    );
  }

  updateUserProfile(updates: Partial<UserProfile>): Observable<UserProfile> {
    console.log('[MOCK USER] Updating profile:', updates);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const data = this.getStoredData();
        const userId = updates.id!;
        
        if (!data.profiles[userId]) {
          throw new Error('User profile not found');
        }

        const updatedProfile = { 
          ...data.profiles[userId], 
          ...updates,
          lastActive: new Date()
        };
        
        data.profiles[userId] = updatedProfile;
        this.saveStoredData(data);
        
        return updatedProfile;
      })
    );
  }

  getGamificationData(userId: string): Observable<GamificationData> {
    console.log('[MOCK USER] Loading gamification data for user:', userId);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const data = this.getStoredData();
        
        if (data.gamification[userId]) {
          return data.gamification[userId];
        }

        // Create mock gamification data for new user
        const gamificationData: GamificationData = {
          points: 150,
          level: 1,
          badges: this.mockBadges.slice(0, 2), // Give first 2 badges
          stats: {
            issuesReported: 4,
            issuesResolved: 2,
            communityVotes: 23,
            commentsGiven: 8,
            helpfulComments: 6,
            qualityScore: 87,
            approvalRate: 85
          },
          achievements: this.mockAchievements,
          streaks: {
            currentLoginStreak: 3,
            longestLoginStreak: 7,
            currentVotingStreak: 2,
            longestVotingStreak: 5,
            lastActivityDate: new Date()
          },
          leaderboardPosition: {
            overall: 847,
            monthly: 156,
            category: 23,
            neighborhood: 8,
            totalUsers: 1250
          }
        };

        data.gamification[userId] = gamificationData;
        this.saveStoredData(data);
        
        return gamificationData;
      })
    );
  }

  updatePoints(points: number, reason: string): Observable<{ newPoints: number; totalPoints: number }> {
    console.log('[MOCK USER] Updating points:', points, reason);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const data = this.getStoredData();
        const userId = this.getCurrentUserId(); // Mock method to get current user
        
        if (!data.gamification[userId]) {
          throw new Error('Gamification data not found');
        }

        const currentTotal = data.gamification[userId].points;
        const newTotal = currentTotal + points;
        
        data.gamification[userId].points = newTotal;
        
        // Check for level up
        const newLevel = Math.floor(newTotal / 1000) + 1;
        if (newLevel > data.gamification[userId].level) {
          data.gamification[userId].level = newLevel;
        }

        this.saveStoredData(data);
        
        return { newPoints: points, totalPoints: newTotal };
      })
    );
  }

  awardBadge(badgeId: string, reason: string): Observable<GamificationData> {
    console.log('[MOCK USER] Awarding badge:', badgeId, reason);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const data = this.getStoredData();
        const userId = this.getCurrentUserId();
        
        if (!data.gamification[userId]) {
          throw new Error('Gamification data not found');
        }

        const badge = this.mockBadges.find(b => b.id === badgeId);
        if (!badge) {
          throw new Error('Badge not found');
        }

        // Check if user already has this badge
        const hasBadge = data.gamification[userId].badges.some((b: any) => b.id === badgeId);
        if (!hasBadge) {
          const newBadge = { ...badge, earnedAt: new Date() };
          data.gamification[userId].badges.push(newBadge);
        }

        this.saveStoredData(data);
        
        return data.gamification[userId];
      })
    );
  }

  updateStreak(type: 'login' | 'voting', increment: boolean): Observable<GamificationData> {
    console.log('[MOCK USER] Updating streak:', type, increment);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const data = this.getStoredData();
        const userId = this.getCurrentUserId();
        
        if (!data.gamification[userId]) {
          throw new Error('Gamification data not found');
        }

        const streaks = data.gamification[userId].streaks;
        
        if (type === 'login') {
          if (increment) {
            streaks.currentLoginStreak++;
            if (streaks.currentLoginStreak > streaks.longestLoginStreak) {
              streaks.longestLoginStreak = streaks.currentLoginStreak;
            }
          } else {
            streaks.currentLoginStreak = 0;
          }
        } else if (type === 'voting') {
          if (increment) {
            streaks.currentVotingStreak++;
            if (streaks.currentVotingStreak > streaks.longestVotingStreak) {
              streaks.longestVotingStreak = streaks.currentVotingStreak;
            }
          } else {
            streaks.currentVotingStreak = 0;
          }
        }

        streaks.lastActivityDate = new Date();
        this.saveStoredData(data);
        
        return data.gamification[userId];
      })
    );
  }

  getUserPreferences(userId: string): Observable<UserPreferences> {
    console.log('[MOCK USER] Loading preferences for user:', userId);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const data = this.getStoredData();
        
        if (data.preferences[userId]) {
          return data.preferences[userId];
        }

        // Create default preferences
        const preferences: UserPreferences = {
          theme: 'light',
          language: 'ro',
          notifications: {
            email: true,
            push: true,
            inApp: true
          },
          privacy: {
            showOnLeaderboard: true,
            shareLocation: true,
            publicProfile: false
          }
        };

        data.preferences[userId] = preferences;
        this.saveStoredData(data);
        
        return preferences;
      })
    );
  }

  updateUserPreferences(updates: Partial<UserPreferences>): Observable<UserPreferences> {
    console.log('[MOCK USER] Updating preferences:', updates);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const data = this.getStoredData();
        const userId = this.getCurrentUserId();
        
        if (!data.preferences[userId]) {
          throw new Error('User preferences not found');
        }

        const updatedPreferences = { 
          ...data.preferences[userId], 
          ...updates 
        };
        
        data.preferences[userId] = updatedPreferences;
        this.saveStoredData(data);
        
        return updatedPreferences;
      })
    );
  }

  // Mock method to simulate getting current user ID
  private getCurrentUserId(): string {
    // In real app, this would come from auth service
    return 'user-001';
  }

  private getStoredData(): any {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : { profiles: {}, gamification: {}, preferences: {} };
  }

  private saveStoredData(data: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  private getRandomDelay(): number {
    return Math.random() * 400 + 300; // 300-700ms
  }
}