import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {View} from 'react-native';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/shared/store/configureStore';
import {getQuestions, getSnippets} from '../quiz.actions';
import {Answer} from '../quiz.types';
import feedbackPresenter from '../../shared/utils/feedbackPresenter';
import AsyncStorage from '@react-native-async-storage/async-storage';

type QuizAnswerProps = {
  answer: Answer;
  onPress: () => void;
};

const submitRank = async (nickname: string, points: number) => {
  try {
    const result = await AsyncStorage.getItem('leaderboard');
    let rank = [];
    if (result !== null) {
      rank = JSON.parse(result);
    }
    rank.push({nickname, points});
    await AsyncStorage.setItem('leaderboard', JSON.stringify(rank));
    feedbackPresenter(
      'success',
      'Saving successful',
      'Your score has been saved in the leaderboard!',
    );
  } catch (error) {
    feedbackPresenter('error', 'Error', "Couldn't save your points.");
    console.log(error);
  }
};

const Answers = (props: {renderAnswers: () => JSX.Element[]}) => {
  return <View style={styles.quizContainer}>{props.renderAnswers()}</View>;
};

const QuizAnswer = ({answer, onPress}: QuizAnswerProps) => {
  return (
    <Card onPress={onPress} style={styles.quizCard}>
      <View style={styles.cardContent}>
        <Text>{answer.artist.name}</Text>
      </View>
    </Card>
  );
};

const Loading = () => {
  return <Text>Loading...</Text>;
};

const Failure = () => {
  return <Text>Something bad happened.</Text>;
};

const showFeedback = (correct: boolean) => {
  correct
    ? feedbackPresenter('success', 'Correct', 'You rock!')
    : feedbackPresenter('error', 'Wrong answer', 'Focus on it!');
};

const Timer = (props: {counter: number}) => {
  return (
    <Text category="h6" appearance="hint">
      {props.counter}
    </Text>
  );
};

const Question = (props: {question: string; counter: number}) => {
  return (
    <Card style={styles.mainCard} disabled>
      <View style={styles.cardContent}>
        <Text category="h5">{props.question}</Text>
        <Timer counter={props.counter} />
      </View>
    </Card>
  );
};

const QuizEndView = (props: {points: number; onPressButton: () => void}) => {
  return (
    <View style={styles.cardContent}>
      <Text category="h4">Quiz ended!</Text>
      <Text category="h5">Your score of {props.points} has been saved.</Text>
      <Button style={styles.startButton} onPress={props.onPressButton}>
        SUBMIT SCORE
      </Button>
    </View>
  );
};

export const QuizBegin = ({route, navigation}: any) => {
  const {tracks, artists} = useSelector((state: RootState) => state.quiz);
  const {snippets, questions, loading, failure} = useSelector(
    (state: RootState) => state.quizBegin,
  );

  const {nickname} = route.params;

  const [currentPhase, setCurrentPhase] = useState(0);
  const [points, setPoints] = useState(0);
  const [counter, setCounter] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSnippets(tracks));
  }, [dispatch, tracks]);

  useEffect(() => {
    if (snippets.length !== 0) {
      dispatch(getQuestions(snippets, artists));
    }
  }, [artists, dispatch, snippets]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    if (counter === 0 && questions[currentPhase] != null) {
      setCounter(10);
      setCurrentPhase(currentPhase + 1);
      showFeedback(false);
    } else if (counter === 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [counter, currentPhase, nickname, points, questions]);

  const onPressButton = useCallback(() => {
    submitRank(nickname, points);
    navigation.navigate('Quiz');
  }, [navigation, nickname, points]);

  if (loading) {
    return <Loading />;
  }

  if (failure) {
    return <Failure />;
  }

  if (questions[currentPhase] == null) {
    return <QuizEndView points={points} onPressButton={onPressButton} />;
  }

  const answerQuestion = (correct: boolean) => {
    setCounter(10);
    setCurrentPhase(currentPhase + 1);
    showFeedback(correct);
    if (correct) {
      setPoints(points + 1);
    }
  };

  const renderCurrentPhaseAnswers = () => {
    return questions[currentPhase].answers.map((answer) => {
      return (
        <QuizAnswer
          answer={answer}
          onPress={() => answerQuestion(answer.correct)}
        />
      );
    });
  };

  const renderCurrentPhaseBody = () => {
    const question = questions[currentPhase].text;
    return (
      <Layout level="1">
        <Question question={question} counter={counter} />
        <Answers renderAnswers={renderCurrentPhaseAnswers} />
      </Layout>
    );
  };

  return (
    <Layout level="3">
      <Layout level="2">
        <Text category="h1" style={styles.title}>
          Who Sings?
        </Text>
        {renderCurrentPhaseBody()}
      </Layout>
    </Layout>
  );
};
