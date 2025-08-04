import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

// Profile Selectors
export const selectUserProfile = createSelector(
  selectUserState,
  (state: UserState) => state.profile
);

export const selectUserLocation = createSelector(
  selectUserProfile,
  (profile) => profile?.location
);

export const selectCommunicationPreferences = createSelector(
  selectUserProfile,
  (profile) => profile?.profile.communicationPrefs
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
  (gamification) => gamification?.badges || []
);

export const selectUserStats = createSelector(
  selectGamificationData,
  (gamification) => gamification?.stats || null
);

export const selectUserAchievements = createSelector(
  selectGamificationData,
  (gamification) => gamification?.achievements || []
);

export const selectUserStreaks = createSelector(
  selectGamificationData,
  (gamification) => gamification?.streaks
);

export const selectLeaderboardPosition = createSelector(
  selectGamificationData,
  (gamification) => gamification?.leaderboardPosition
);

// Progress and Stats Selectors
export const selectIssuesReported = createSelector(
  selectUserStats,
  (stats) => stats?.issuesReported || 0
);

export const selectIssuesResolved = createSelector(
  selectUserStats,
  (stats) => stats?.issuesResolved || 0
);

export const selectCommunityVotes = createSelector(
  selectUserStats,
  (stats) => stats?.communityVotes || 0
);

export const selectApprovalRate = createSelector(
  selectUserStats,
  (stats) => stats?.approvalRate || 0
);

export const selectQualityScore = createSelector(
  selectUserStats,
  (stats) => stats?.qualityScore || 0
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
  selectUserPoints,
  selectUserLevel,
  (points, level) => {
    const pointsForNextLevel = level * 1000; // 1000 points per level
    const pointsInCurrentLevel = points % 1000;
    return {
      current: pointsInCurrentLevel,
      required: 1000,
      percentage: (pointsInCurrentLevel / 1000) * 100
    };
  }
);

export const selectRecentBadges = createSelector(
  selectUserBadges,
  (badges) => badges
    .filter(badge => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(badge.earnedAt) > oneWeekAgo;
    })
    .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
    .slice(0, 5)
);

export const selectIncompleteAchievements = createSelector(
  selectUserAchievements,
  (achievements) => achievements
    .filter(achievement => !achievement.completed)
    .sort((a, b) => b.progress - a.progress)
);