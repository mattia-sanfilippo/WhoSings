import React, {useCallback, useEffect} from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {styles} from './styles';
import {RootState} from 'src/shared/store/configureStore';
import {useDispatch, useSelector} from 'react-redux';
import {getTracks} from '../quiz.actions';
import {useNavigation} from '@react-navigation/core';

export const Quiz = () => {
  const {loading, failure} = useSelector((state: RootState) => state.quiz);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getTracks());
  }, [dispatch]);

  const onPressButton = useCallback(() => {
    navigation.navigate('QuizBegin');
  }, [navigation]);

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
          <Button style={styles.startButton} onPress={onPressButton}>
            START
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};
