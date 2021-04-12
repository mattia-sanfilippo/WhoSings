import {Card, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Answer} from '../quiz.types';

type QuizAnswerProps = {
  answer: Answer;
  onPress: () => void;
};

const styles = StyleSheet.create({
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizCard: {
    margin: 8,
  },
});

const QuizAnswer = ({answer, onPress}: QuizAnswerProps) => {
  return (
    <Card onPress={onPress} style={styles.quizCard}>
      <View style={styles.cardContent}>
        <Text>{answer.artist.name}</Text>
      </View>
    </Card>
  );
};

export default QuizAnswer;
