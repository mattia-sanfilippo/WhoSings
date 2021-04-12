import {Card, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Timer from './Timer';

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  mainCard: {
    margin: 8,
    height: 128,
    justifyContent: 'center',
    borderRadius: 25,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

export default Question;
