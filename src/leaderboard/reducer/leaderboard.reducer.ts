import {Leaderboard} from '../leaderboard.types';
import {
  GET_LEADERBOARD,
  GET_USER_LEADERBOARD,
} from './../leaderboard.constants';

export type LeaderboardState = {
  userLeaderboard: Leaderboard;
  leaderboard: Leaderboard;
  loading: boolean;
  failure?: Error;
};

const initialState: LeaderboardState = {
  userLeaderboard: [],
  leaderboard: [],
  loading: true,
  failure: undefined,
};

const sortLeaderboard = (leaderboard: Leaderboard) => {
  return leaderboard.sort((a, b) => {
    return b.points - a.points;
  });
};

export const leaderboardReducer = (
  state: LeaderboardState = initialState,
  action: any,
): LeaderboardState => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        loading: false,
        failure: action.failure,
        leaderboard: sortLeaderboard(action.payload),
      };
    case GET_USER_LEADERBOARD:
      return {
        ...state,
        loading: false,
        failure: action.failure,
        userLeaderboard: sortLeaderboard(action.payload),
      };
    default:
      return {
        ...state,
      };
  }
};
