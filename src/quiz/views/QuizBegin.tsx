import React, {useEffect} from 'react';
import {Card, Layout, Text} from '@ui-kitten/components';
import {View} from 'react-native';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/shared/store/configureStore';
import {getSnippets} from '../quiz.actions';
import {Artist, Questions, TrackSnippet} from '../quiz.types';
import {pickShuffled} from 'src/shared/utils/pickShuffled';

type QuizAnswerProps = {
  answer: string;
  correct?: boolean;
};

const QuizAnswer = ({answer, correct}: QuizAnswerProps) => {
  const status = correct ? 'success' : 'basic';
  return (
    <Card status={status} style={styles.quizCard}>
      <View style={styles.cardContent}>
        <Text>{answer}</Text>
      </View>
    </Card>
  );
};

const generateQuestions = (
  snippets: TrackSnippet[],
  artists: Artist[],
): Questions => {
  return snippets.map((snippet): any => {
    const randomArtists = pickShuffled(artists, 2);
    const randomAnswers = randomArtists.map((randomArtist) => {
      return {
        text: randomArtist.name,
        correct: randomArtist.id === snippet.artist.id ? true : false,
      };
    });
    return {
      text: snippet.body,
      answers: pickShuffled(
        [...randomAnswers, {text: snippet.artist.name, correct: true}],
        3,
      ),
    };
  });
};

export const QuizBegin = () => {
  const {tracks, artists} = useSelector((state: RootState) => state.quiz);
  const {snippets, loading, failure} = useSelector(
    (state: RootState) => state.quizBegin,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSnippets(tracks));
  }, [dispatch, tracks]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (failure) {
    return <Text>Something bad happened.</Text>;
  }

  const questions = generateQuestions(snippets, artists);

  console.log(questions);

  return (
    <Layout level="3">
      <Layout level="2">
        <Text category="h1" style={styles.title}>
          Who Sings?
        </Text>
        <Layout level="1">
          <Card style={styles.mainCard} disabled>
            <View style={styles.cardContent}>
              <Text category="h6">LYRICS</Text>
            </View>
          </Card>
          <View style={styles.quizContainer}>
            <QuizAnswer answer="ARTIST 1" />
            <QuizAnswer answer="ARTIST 2" correct />
            <QuizAnswer answer="ARTIST 3" />
          </View>
        </Layout>
      </Layout>
    </Layout>
  );
};
