import {GET_USER, LOGOUT_USER} from '../user.constants';

export type UserState = {
  user: string;
  isLoggedIn: boolean;
  loadingUser: boolean;
  failureUser?: Error;
};

const initialState: UserState = {
  user: '',
  isLoggedIn: false,
  loadingUser: true,
  failureUser: undefined,
};

export const userReducer = (
  state: UserState = initialState,
  action: any,
): UserState => {
  switch (action.type) {
    case GET_USER:
      const user = action.payload;
      return {
        ...state,
        loadingUser: false,
        failureUser: action.failure,
        user,
        isLoggedIn: user !== '' ? true : false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loadingUser: false,
        failureUser: action.failure,
        user: '',
        isLoggedIn: false,
      };
    default:
      return {
        ...state,
      };
  }
};
