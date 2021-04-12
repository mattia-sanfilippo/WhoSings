import React, {FC, useEffect} from 'react';
import {ListItem, Text} from '@ui-kitten/components';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/shared/store/configureStore';
import {getLeaderboard} from '../leaderboard.actions';
import {Rank} from '../leaderboard.types';

export const Leaderboard: FC = () => {
  const {leaderboard, loading, failure} = useSelector(
    (state: RootState) => state.leaderboard,
  );

  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(getLeaderboard());
  };

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  const renderItem = ({item}: {item: Rank}) => (
    <ListItem title={item.playerName} description={item.points.toString()} />
  );

  const renderContent = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (failure) {
      return <Text>There was an error</Text>;
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
        <Text category="h1">Leaderboard</Text>
      </View>
      <View>{renderContent()}</View>
    </View>
  );
};
