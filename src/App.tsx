import 'react-native-gesture-handler';
import React from 'react';

import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {AppProvider} from './hooks'

import Routes from './routes/index';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#6F9F77" />
    <AppProvider>
      <View style={{flex: 1, backgroundColor: '#D9D9D9'}}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
