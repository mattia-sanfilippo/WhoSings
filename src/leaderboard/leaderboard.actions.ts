import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_LEADERBOARD} from './leaderboard.constants';

export const getLeaderboard = () => {
  return function (dispatch: any) {
    return AsyncStorage.getItem('leaderboard')
      .then((result) => {
        result != null
          ? dispatch(setLeaderboard(JSON.parse(result)))
          : dispatch(setLeaderboard([]));
      })
      .catch((error) => {
        dispatch(setLeaderboard([], error));
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
