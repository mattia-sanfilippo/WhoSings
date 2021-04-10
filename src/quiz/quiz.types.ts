export type Tracks = Track[];

export type Track = {
  id: string;
  name: string;
  rating: number;
  explicit: boolean;
  artist: Artist;
};

export type Artist = {
  id: string;
  name: string;
};

export type TrackSnippet = {
  id: string;
  body: string;
  artist: Artist;
};

export type Questions = Question[];

export type Question = {
  text: string;
  answers: Answer;
};

export type Answer = {
  text: string;
  correct: boolean;
};
