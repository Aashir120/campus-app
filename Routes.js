import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './containers/HomeScreen/Home'
import AuthScreen from './containers/AuthScreen/index'
import ViewPresent from './ViewData'
import BeMember from './BeMember'
import CameraExample from './Camera'
import Preview from './Preview'

const Authnavigator = createStackNavigator({
    AuthScreen: {
        screen: AuthScreen,
        navigationOptions: {
            header: null
        }
    },
   
        
},
    { initialRouteName: 'AuthScreen' }
);


const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Dashboard',
          }
    },
    ViewPresent: {
        screen: ViewPresent,
        navigationOptions: {
            title: 'All Members',
          }
    },
    BeMember: {
        screen: BeMember,
        navigationOptions: {
            title: 'Campus Recruitment System',
          }
    },
    CameraExample: {
        screen: CameraExample,
        navigationOptions: {
           header:null
          },
    },
    Preview: {
        screen: Preview,
        navigationOptions: {
            header:null
           },
    },
},
    { initialRouteName: 'Home' }
);



export default createAppContainer(createSwitchNavigator(
    {
        Auth: Authnavigator,
        App: AppNavigator,
    },
    {
        initialRouteName: 'Auth',
    }
));