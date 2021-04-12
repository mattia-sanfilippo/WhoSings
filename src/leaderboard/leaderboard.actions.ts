import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_LEADERBOARD, GET_USER_LEADERBOARD} from './leaderboard.constants';
import {Rank} from './leaderboard.types';

export const getLeaderboard = () => {
  return function (dispatch: any) {
    return AsyncStorage.getItem('leaderboard')
      .then((result) => {
        if (result != null) {
          const ranks = JSON.parse(result);
          dispatch(setLeaderboard(ranks));
        } else {
          dispatch(setLeaderboard([]));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLeaderboard([], error));
      });
  };
};

export const getUserLeaderboard = (user: string) => {
  return function (dispatch: any) {
    return AsyncStorage.getItem('leaderboard')
      .then((result) => {
        if (result != null) {
          const ranks = JSON.parse(result);
          dispatch(
            setUserLeaderboard(
              ranks.filter((r: Rank) => r.playerName === user),
            ),
          );
        } else {
          dispatch(setUserLeaderboard([]));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setUserLeaderboard([], error));
      });
  };
};

const setLeaderboard = (leaderboard: any, error?: Error) => {
  return {
    type: GET_LEADERBOARD,
    payload: leaderboard,
    failure: error,
  };
};

const setUserLeaderboard = (leaderboard: any, error?: Error) => {
  return {
    type: GET_USER_LEADERBOARD,
    payload: leaderboard,
    failure: error,
  };
};
