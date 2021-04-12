import React, {FC, useCallback, useEffect} from 'react';
import {Button, ListItem, Spinner, Text} from '@ui-kitten/components';
import {Alert, FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/shared/store/configureStore';
import {getUserLeaderboard} from '../../leaderboard/leaderboard.actions';
import {Rank} from '../../leaderboard/leaderboard.types';
import {logOutUser} from '../../user/user.actions';
import {styles} from './styles';
import Title from '../../components/Title';
import ErrorMessage from '../../components/ErrorMessage';

export const Profile: FC = () => {
  const {userLeaderboard, loading, failure} = useSelector(
    (state: RootState) => state.leaderboard,
  );

  const {user, isLoggedIn} = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    dispatch(getUserLeaderboard(user));
  }, [dispatch, user]);

  const onPressRetry = useCallback(() => {
    dispatch(getUserLeaderboard(user));
  }, [dispatch, user]);

  const onPressButton = () => {
    Alert.alert('Logout', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => dispatch(logOutUser()),
      },
    ]);
  };

  useEffect(() => {
    dispatch(getUserLeaderboard(user));
  }, [dispatch, user]);

  const renderItem = ({item}: {item: Rank}) => (
    <ListItem title={item.playerName} description={item.points.toString()} />
  );

  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }
    if (failure) {
      return (
        <ErrorMessage
          message="There was an error"
          buttonMessage="Retry"
          onPressButton={onPressRetry}
        />
      );
    }

    if (!isLoggedIn) {
      return <Text>You have to log in before accessing this page!</Text>;
    }
    return (
      <View>
        <View style={styles.container}>
          <Text category="h4">Welcome, {user}!</Text>
          <Button style={styles.button} onPress={onPressButton}>
            Logout
          </Button>
        </View>
        <Text category="h4">Your scores</Text>
        <FlatList
          data={userLeaderboard}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={loading}
          onRefresh={onRefresh}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={styles.listSpace}
        />
      </View>
    );
  };

  return (
    <View>
      <Title title="Profile" />
      <View>{renderContent()}</View>
    </View>
  );
};
