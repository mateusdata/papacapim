import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../../screens/Feed';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { colorPrimary } from '../../constants/constants';
import CreatePost from '../../screens/CreatePost';
import Profile from '../../screens/Profile';
import SeachPost from '../../screens/SeachPost';
import Comments from '../../screens/Comments';
const Stack = createStackNavigator();

export default function PrivateRoutes() {
  return (
    <Stack.Navigator screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: {
        backgroundColor: "#fff2"
      }
    }}>
      <Stack.Screen name='Root' component={TabNavigator} options={{
        headerShown: false,

      }} />
      <Stack.Screen name='Profile' component={Profile} options={{
        headerTitle: "Perfil de usuario",
        headerTitleAlign: "center"
      }} />
      <Stack.Screen name='CreatePost' component={CreatePost} options={{
        headerTitle: "Novo post",
        headerTitleAlign: "center"
      }} />

      <Stack.Screen name='SeachPost' component={SeachPost} options={{
        headerTitle: "Pesquisar postagens",
        headerTitleAlign: "center"
      }} />

      <Stack.Screen name='Comments' component={Comments} options={{
        headerTitle: "Comentarios",
        headerTitleAlign: "center"
      }} />


    </Stack.Navigator>
  )
}
