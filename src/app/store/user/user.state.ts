// User Profile and Gamification State Interface
export interface UserState {
  profile: UserProfile | null;
  gamification: GamificationData | null;
  preferences: UserPreferences | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  location: {
    county: string;
    city: string;
    district: string;
  };
  profile: {
    residenceType?: 'apartment' | 'house' | 'business';
    communicationPrefs: {
      issueUpdates: boolean;
      communityNews: boolean;
      monthlyDigest: boolean;
      achievements: boolean;
    };
  };
  createdAt: Date;
  lastActive: Date;
  emailVerified: boolean;
}

export interface GamificationData {
  points: number;
  level: number;
  badges: Badge[];
  stats: UserStats;
  achievements: Achievement[];
  streaks: Streaks;
  leaderboardPosition?: LeaderboardPosition;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  category: 'starter' | 'progress' | 'achievement' | 'special';
  earnedAt: Date;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface UserStats {
  issuesReported: number;
  issuesResolved: number;
  communityVotes: number;
  commentsGiven: number;
  helpfulComments: number;
  qualityScore: number; // 0-100
  approvalRate: number; // 0-100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  maxProgress: number;
  completed: boolean;
  completedAt?: Date;
  reward: {
    points: number;
    badge?: string;
  };
}

export interface Streaks {
  currentLoginStreak: number;
  longestLoginStreak: number;
  currentVotingStreak: number;
  longestVotingStreak: number;
  lastActivityDate: Date;
}

export interface LeaderboardPosition {
  overall: number;
  monthly: number;
  category: number;
  neighborhood: number;
  totalUsers: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'ro' | 'en';
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  privacy: {
    showOnLeaderboard: boolean;
    shareLocation: boolean;
    publicProfile: boolean;
  };
}

export const initialUserState: UserState = {
  profile: null,
  gamification: null,
  preferences: null,
  isLoading: false,
  error: null
};