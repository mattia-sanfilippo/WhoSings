import {Artist, Tracks} from './../quiz.types';
import {GET_TRACKS, QUESTIONS_NUMBER} from './../quiz.constants';
import {pickShuffled} from 'src/shared/utils/pickShuffled';

export type QuizState = {
  tracks: Tracks;
  artists: Artist[];
  loading: boolean;
  failure?: Error;
};

const initialState: QuizState = {
  tracks: [],
  artists: [],
  loading: true,
  failure: undefined,
};

const mapTracks = (tracks: any): Tracks => {
  const mappedTracks = tracks.map(({track}: any) => {
    return {
      id: track.track_id,
      name: track.track_name,
      rating: track.track_rating,
      explicit: track.explicit === 1 ? true : false,
      artist: {
        id: track.artist_id,
        name: track.artist_name,
      },
    };
  });
  return pickShuffled(mappedTracks, QUESTIONS_NUMBER * 2);
};

const mapArtists = (tracks: any): Artist[] => {
  return tracks.map(({track}: any) => {
    return {
      id: track.artist_id,
      name: track.artist_name,
    };
  });
};

export const quizReducer = (
  state: QuizState = initialState,
  action: any,
): QuizState => {
  switch (action.type) {
    case GET_TRACKS:
      const mappedTracks = action.payload.length
        ? mapTracks(action.payload)
        : [];
      const mappedArtists = action.payload.length
        ? mapArtists(action.payload)
        : [];
      return {
        ...state,
        loading: false,
        failure: action.failure,
        tracks: mappedTracks,
        artists: mappedArtists,
      };
    default:
      return {
        ...state,
      };
  }
};
