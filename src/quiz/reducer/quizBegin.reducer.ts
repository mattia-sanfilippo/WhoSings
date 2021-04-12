import {
  CLEAR_QUESTIONS,
  GET_QUESTIONS,
  GET_SNIPPETS,
  QUESTIONS_NUMBER,
} from '../quiz.constants';
import {Questions, TrackSnippet} from '../quiz.types';

export type QuizState = {
  snippets: TrackSnippet[];
  questions: Questions;
  loading: boolean;
  failure?: Error;
};

const initialState: QuizState = {
  snippets: [],
  questions: [],
  loading: true,
  failure: undefined,
};

const mapSnippets = (snippets: any): TrackSnippet[] => {
  const validSnippets = snippets.filter(
    (snippet: any) => snippet.snippet !== undefined,
  );
  const mappedSnippets = validSnippets.map((snippet: any) => {
    return {
      id: snippet.snippet.snippet_id,
      body: snippet.snippet.snippet_body,
      artist: {
        id: snippet.artist.id,
        name: snippet.artist.name,
      },
    };
  });
  return mappedSnippets.slice(0, QUESTIONS_NUMBER);
};

export const quizBeginReducer = (
  state: QuizState = initialState,
  action: any,
): QuizState => {
  switch (action.type) {
    case GET_SNIPPETS:
      return {
        ...state,
        snippets: mapSnippets(action.payload),
      };
    case GET_QUESTIONS:
      return {
        ...state,
        loading: false,
        failure: undefined,
        questions: action.payload,
      };
    case CLEAR_QUESTIONS:
      return {
        ...state,
        questions: [],
      };
    default:
      return {
        ...state,
      };
  }
};
