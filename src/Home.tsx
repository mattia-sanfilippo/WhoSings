import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Quiz} from './quiz/views/Quiz';
import {NavigationContainer} from '@react-navigation/native';
import {Leaderboard} from './leaderboard/views/Leaderboard';
import {Profile} from './profile/views/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import {QuizBegin} from './quiz/views/QuizBegin';
import Toast from 'react-native-toast-message';

const {Navigator, Screen} = createBottomTabNavigator();

const PersonIcon = (props: IconProps) => <Icon {...props} name="person" />;
const HeadphonesIcon = (props: IconProps) => (
  <Icon {...props} name="headphones" />
);
const ListIcon = (props: IconProps) => <Icon {...props} name="list" />;

const BottomTabBar = ({navigation, state}: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Quiz" icon={HeadphonesIcon} />
    <BottomNavigationTab title="Leaderboard" icon={ListIcon} />
    <BottomNavigationTab title="Profile" icon={PersonIcon} />
  </BottomNavigation>
);

const HomeStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Quiz" component={Quiz} />
      <HomeStack.Screen name="QuizBegin" component={QuizBegin} />
    </HomeStack.Navigator>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Quiz" component={Home} />
    <Screen name="Leaderboard" component={Leaderboard} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </NavigationContainer>
);
