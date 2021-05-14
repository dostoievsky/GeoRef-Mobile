import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderMenu from '../components/HeaderMenu';

import Start from '../Modules/Project/Pages/Start';
import Projects from '../Modules/Project/Pages/Projects';
import NewProject from '../Modules/Project/Pages/NewProject';
import EditPoint from '../Modules/Project/Pages/EditPoint';
import FinishProject from '../Modules/Project/Pages/FinishProject';

import Profile from '../Modules/Profile/pages/Profile';
import UpdateProfile from '../Modules/Profile/pages/UpdateProfile';

import {MapProvider} from '../hooks';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <MapProvider>
    <App.Navigator
      screenOptions={{
        //headerShown: false,
        headerLeft: () => (
          <HeaderMenu/>
        ),
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#6F9F77',
        },
        cardStyle: {backgroundColor: '#D9D9D9'},
      }}
    >
      <App.Screen name="Start" component={Start}/>
      <App.Screen name="Projects" component={Projects}/>
      <App.Screen name="NewProject" component={NewProject}/>
      <App.Screen name="EditPoint" component={EditPoint}/>
      <App.Screen name="FinishProject" component={FinishProject}/>

      <App.Screen name="Profile" component={Profile}/>
      <App.Screen name="UpdateProfile" component={UpdateProfile}/>
    </App.Navigator>
  </MapProvider>
);

export default AppRoutes;
