import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import {styles} from './styles';
import {RootState} from 'src/shared/store/configureStore';
import {useDispatch, useSelector} from 'react-redux';
import {getTracks} from '../quiz.actions';
import {useNavigation} from '@react-navigation/core';
import {getUser, logInUser} from '../../user/user.actions';
import Title from '../../components/Title';

export const Quiz: FC = () => {
  const {loading, failure} = useSelector((state: RootState) => state.quiz);
  const {user, isLoggedIn, loadingUser, failureUser} = useSelector(
    (state: RootState) => state.user,
  );

  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getTracks());
    dispatch(getUser());
  }, [dispatch]);

  const onPressButton = useCallback(() => {
    !isLoggedIn
      ? dispatch(logInUser(name, navigation, 'QuizBegin'))
      : navigation.navigate('QuizBegin', {
          nickname: user,
        });
  }, [dispatch, isLoggedIn, name, navigation, user]);

  if (loading || loadingUser) {
    return <Spinner />;
  }

  if (failure || failureUser) {
    return <Text>There was an error</Text>;
  }

  return (
    <Layout level="3">
      <Layout level="2">
        <Title title="Who Sings?" />
        <Layout level="1" style={styles.quizContainer}>
          {!isLoggedIn && (
            <Input
              style={styles.startButton}
              value={name}
              label="Username"
              placeholder="Type your username"
              onChangeText={(nextName) => setName(nextName)}
            />
          )}
          <Button
            style={styles.startButton}
            onPress={onPressButton}
            disabled={name === '' && user === ''}>
            START
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};
