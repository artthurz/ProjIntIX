import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import * as React from 'react';
import Login from '../screens/SignIn';
import CreateProject from '../screens/CreateProject'

const Switch = createAppContainer(createSwitchNavigator(
  {
    Auth: Login,
    Project: CreateProject
  },
  {
    initialRouteName: 'Project',
  }
));

export default function SwitchNavigator() {
  return (
    <Switch/>
  );
}

