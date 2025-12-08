import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { BadgeResponse, AchievementProgressResponse } from '../../types/civica-api.types';

export const selectUserState = createFeatureSelector<UserState>('user');

// Profile Selectors
export const selectUserProfile = createSelector(
  selectUserState,
  (state: UserState) => state.profile
);

export const selectUserLocation = createSelector(
  selectUserProfile,
  (profile) => profile ? { county: profile.county, city: profile.city, district: profile.district } : null
);

export const selectCommunicationPreferences = createSelector(
  selectUserState,
  (state: UserState) => state.preferences?.notifications
);

// Gamification Selectors
export const selectGamificationData = createSelector(
  selectUserState,
  (state: UserState) => state.gamification
);

export const selectUserPoints = createSelector(
  selectGamificationData,
  (gamification) => gamification?.points || 0
);

export const selectUserLevel = createSelector(
  selectGamificationData,
  (gamification) => gamification?.level || 1
);

export const selectUserBadges = createSelector(
  selectGamificationData,
  (gamification) => gamification?.recentBadges || []
);

export const selectUserStats = createSelector(
  selectGamificationData,
  (gamification) => gamification ? {
    issuesReported: gamification.issuesReported,
    issuesResolved: gamification.issuesResolved,
    communityVotes: gamification.communityVotes
  } : null
);

export const selectUserAchievements = createSelector(
  selectGamificationData,
  (gamification) => gamification?.activeAchievements || []
);

export const selectUserStreaks = createSelector(
  selectGamificationData,
  (gamification) => gamification ? {
    currentLoginStreak: gamification.currentLoginStreak,
    longestLoginStreak: gamification.longestLoginStreak
  } : null
);

// Progress and Stats Selectors
export const selectIssuesReported = createSelector(
  selectGamificationData,
  (gamification) => gamification?.issuesReported || 0
);

export const selectIssuesResolved = createSelector(
  selectGamificationData,
  (gamification) => gamification?.issuesResolved || 0
);

export const selectCommunityVotes = createSelector(
  selectGamificationData,
  (gamification) => gamification?.communityVotes || 0
);

// Preferences Selectors
export const selectUserPreferences = createSelector(
  selectUserState,
  (state: UserState) => state.preferences
);

export const selectNotificationPreferences = createSelector(
  selectUserPreferences,
  (preferences) => preferences?.notifications
);

export const selectPrivacySettings = createSelector(
  selectUserPreferences,
  (preferences) => preferences?.privacy
);

export const selectThemePreference = createSelector(
  selectUserPreferences,
  (preferences) => preferences?.theme || 'light'
);

export const selectLanguagePreference = createSelector(
  selectUserPreferences,
  (preferences) => preferences?.language || 'ro'
);

// Loading and Error Selectors
export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.isLoading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// Computed Selectors
export const selectNextLevelProgress = createSelector(
  selectGamificationData,
  (gamification) => ({
    current: gamification?.pointsInCurrentLevel || 0,
    required: gamification?.nextLevelPoints || 1000,
    percentage: gamification?.levelProgressPercentage || 0
  })
);

export const selectRecentBadges = createSelector(
  selectUserBadges,
  (badges: BadgeResponse[]) => badges
    .filter((badge: BadgeResponse) => {
      if (!badge.earnedAt) return false;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(badge.earnedAt) > oneWeekAgo;
    })
    .sort((a: BadgeResponse, b: BadgeResponse) => {
      if (!a.earnedAt || !b.earnedAt) return 0;
      return new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime();
    })
    .slice(0, 5)
);

export const selectIncompleteAchievements = createSelector(
  selectUserAchievements,
  (achievements: AchievementProgressResponse[]) => achievements
    .filter((achievement: AchievementProgressResponse) => !achievement.completed)
    .sort((a: AchievementProgressResponse, b: AchievementProgressResponse) => 
      (b.percentageComplete || 0) - (a.percentageComplete || 0))
);