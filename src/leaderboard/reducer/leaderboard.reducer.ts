import {Leaderboard} from '../leaderboard.types';
import {GET_LEADERBOARD} from './../leaderboard.constants';

export type LeaderboardState = {
  leaderboard: Leaderboard;
  loading: boolean;
  failure?: Error;
};

const initialState: LeaderboardState = {
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
    default:
      return {
        ...state,
      };
  }
};
