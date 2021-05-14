import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../Modules/Auth/Pages/SignIn';
import SignUp from '../Modules/Auth/Pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#D9D9D9'},
    }}
    initialRouteName="SignIn"
  >

    <Auth.Screen name="Login" component={SignIn}/>
    <Auth.Screen name="SignUp" component={SignUp}/>
  </Auth.Navigator>
);

export default AuthRoutes;
