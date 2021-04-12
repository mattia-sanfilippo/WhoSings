import axios, {AxiosResponse} from 'axios';
import {MUSIXMATCH_API_URL, MUSIXMATCH_API_KEY} from '@env';
import {Artist, Tracks, TrackSnippet} from './quiz.types';
import {
  CLEAR_QUESTIONS,
  GET_QUESTIONS,
  GET_SNIPPETS,
  GET_TRACKS,
} from './quiz.constants';
import pickShuffled from '../../src/shared/utils/pickShuffled';

export const getTracks = () => {
  return function (dispatch: any) {
    return axios
      .get(`${MUSIXMATCH_API_URL}/chart.tracks.get`, {
        params: {
          apikey: MUSIXMATCH_API_KEY,
          chart_name: 'top',
          page: 1,
          page_size: 100,
          country: 'it',
          f_has_lyrics: 1,
        },
      })
      .then(({data}) => {
        dispatch(setTracks(data.message.body.track_list));
      })
      .catch((error) => {
        dispatch(setTracks([], error));
      });
  };
};

export const getSnippets = (tracks: Tracks) => {
  const artists = mapArtistsFromTracks(tracks);
  const requests = tracks.map((track) => {
    return axios.get(`${MUSIXMATCH_API_URL}/track.snippet.get`, {
      params: {
        apikey: MUSIXMATCH_API_KEY,
        track_id: track.id,
      },
    });
  });

  return function (dispatch: any) {
    return Promise.all(requests)
      .then((results) => {
        dispatch(setSnippets(results, artists));
      })
      .catch((error) => {
        dispatch(setSnippets([], [], error));
      });
  };
};

export const getQuestions = (snippets: TrackSnippet[], artists: Artist[]) => {
  const questions = snippets.map((snippet): any => {
    const randomArtists = pickShuffled(artists, 2);
    const randomAnswers = generateRandomAnswers(randomArtists, snippet);
    return {
      text: snippet.body,
      answers: pickShuffled(
        [
          ...randomAnswers,
          {
            artist: {id: snippet.artist.id, name: snippet.artist.name},
            correct: true,
          },
        ],
        3,
      ),
    };
  });

  return function (dispatch: any) {
    dispatch(setQuestions(questions));
  };
};

const setQuestions = (data: any, error?: Error) => {
  return {
    type: GET_QUESTIONS,
    payload: data,
    failure: error,
  };
};

export const clearQuestions = () => {
  return {
    type: CLEAR_QUESTIONS,
    payload: undefined,
    failure: undefined,
  };
};

const setSnippets = (
  response: AxiosResponse[],
  artists: Artist[],
  error?: Error,
) => {
  const snippets = response
    ? response.map((result: AxiosResponse, index: number) => {
        return {
          snippet: result.data.message.body?.snippet,
          artist: artists[index],
        };
      })
    : [];
  return {
    type: GET_SNIPPETS,
    payload: snippets,
    failure: error,
  };
};

const setTracks = (data: any, error?: Error) => {
  return {
    type: GET_TRACKS,
    payload: data,
    failure: error,
  };
};

const generateRandomAnswers = (
  randomArtists: Artist[],
  snippet: TrackSnippet,
) => {
  return randomArtists.map((randomArtist) => {
    return {
      artist: {
        id: randomArtist.id,
        name: randomArtist.name,
      },
      correct: randomArtist.id === snippet.artist.id ? true : false,
    };
  });
};

const mapArtistsFromTracks = (tracks: Tracks) => {
  return tracks.map((track) => {
    return {
      id: track.artist.id,
      name: track.artist.name,
    };
  });
};
