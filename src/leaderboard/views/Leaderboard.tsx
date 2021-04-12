import React, {FC, useCallback, useEffect} from 'react';
import {ListItem, Spinner} from '@ui-kitten/components';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/shared/store/configureStore';
import {getLeaderboard} from '../leaderboard.actions';
import {Rank} from '../leaderboard.types';
import Title from '../../components/Title';
import ErrorMessage from '../../components/ErrorMessage';

export const Leaderboard: FC = () => {
  const {leaderboard, loading, failure} = useSelector(
    (state: RootState) => state.leaderboard,
  );

  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(getLeaderboard());
  };

  const onPressRetry = useCallback(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

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
    return (
      <FlatList
        data={leaderboard}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    );
  };

  return (
    <View>
      <View>
        <Title title="Leaderboard" />
      </View>
      <View>{renderContent()}</View>
    </View>
  );
};
