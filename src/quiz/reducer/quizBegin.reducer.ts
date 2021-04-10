import {GET_SNIPPETS, QUESTIONS_NUMBER} from '../quiz.constants';
import {TrackSnippet} from '../quiz.types';

export type QuizState = {
  snippets: TrackSnippet[];
  loading: boolean;
  failure?: Error;
};

const initialState: QuizState = {
  snippets: [],
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
        loading: false,
        failure: action.failure,
        snippets: mapSnippets(action.payload),
      };
    default:
      return {
        ...state,
      };
  }
};
