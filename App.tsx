/**
 * WhoSings App
 * @author Mattia Sanfilippo
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {AppNavigator} from './src/Home';
import {Provider} from 'react-redux';
import {store} from './src/shared/store/configureStore';
import {SafeAreaView} from 'react-native';

export default (): React.ReactFragment => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <SafeAreaView style={{flex: 1}}>
          <AppNavigator />
        </SafeAreaView>
      </Provider>
    </ApplicationProvider>
  </>
);
