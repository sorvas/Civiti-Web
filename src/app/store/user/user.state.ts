import { UserProfileResponse, UserGamificationResponse, BadgeResponse, AchievementProgressResponse } from '../../types/civica-api.types';

export interface UserState {
  profile: UserProfileResponse | null;  // Updated to use backend type
  gamification: UserGamificationResponse | null;  // Updated to use backend type
  preferences: UserPreferences | null;
  isLoading: boolean;
  error: string | null;
}

// Use the backend UserProfileResponse type directly
export type UserProfile = UserProfileResponse;

// Use the backend UserGamificationResponse type directly
export type GamificationData = UserGamificationResponse;

// Re-export for backward compatibility
export type Achievement = AchievementProgressResponse;
export type Badge = BadgeResponse;

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