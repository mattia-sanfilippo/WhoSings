import {leaderboardReducer} from './../../leaderboard/reducer/leaderboard.reducer';
import {quizBeginReducer} from './../../quiz/reducer/quizBegin.reducer';
import {quizReducer} from './../../quiz/reducer/quiz.reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  quiz: quizReducer,
  quizBegin: quizBeginReducer,
  leaderboard: leaderboardReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
