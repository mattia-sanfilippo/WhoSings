import React, {useCallback, useEffect, useState} from 'react';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {styles} from './styles';
import {RootState} from 'src/shared/store/configureStore';
import {useDispatch, useSelector} from 'react-redux';
import {getTracks} from '../quiz.actions';
import {useNavigation} from '@react-navigation/core';

export const Quiz = () => {
  const {loading, failure} = useSelector((state: RootState) => state.quiz);
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getTracks());
  }, [dispatch]);

  const onPressButton = useCallback(() => {
    navigation.navigate('QuizBegin', {
      nickname: name,
    });
  }, [name, navigation]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (failure) {
    return <Text>There was an error</Text>;
  }

  return (
    <Layout level="3">
      <Layout level="2">
        <Text category="h1" style={styles.title}>
          Who Sings?
        </Text>
        <Layout level="1" style={styles.quizContainer}>
          <Input
            style={styles.startButton}
            value={name}
            label="Username"
            placeholder="Type your username"
            onChangeText={(nextName) => setName(nextName)}
          />
          <Button
            style={styles.startButton}
            onPress={onPressButton}
            disabled={name === ''}>
            START
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};
