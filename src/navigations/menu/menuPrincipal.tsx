import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TelasProfile from '../screens/telasProfile';
import Cabecalho from '../../components/cabecalho';
import Notificacoes from '../../pages/notificacoes/notificacoes';
import Mensagens from '../../pages/chat/mensagens';
import TelasLaboratorio from '../screens/telasLaboratorio';
import TelasListaViagens from '../screens/telasListaViagens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialBottomTabNavigator();

export default function MenuPrincipal() {
  return (
    <>
      <Cabecalho />
      <Tab.Navigator barStyle={{ backgroundColor: '#fff' }} initialRouteName={"TelasListaViagens"} >
        <Tab.Screen name="Notificacoes" component={Notificacoes} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="bell"  color={focused ? '#0FD06F' : '#BABABA'} size={29} />
          )
        }} />
        <Tab.Screen name="TelasLaboratorio" component={TelasLaboratorio} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="pen" color={focused ? '#0FD06F' : '#BABABA'} size={29} />
          )
        }} />
        <Tab.Screen name="TelasListaViagens" component={TelasListaViagens} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="airplane" color={focused ? '#0FD06F' : '#BABABA'} size={29} />
          )
        }} />
        <Tab.Screen name="Mensagens" component={Mensagens} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="message" color={focused ? '#0FD06F' : '#BABABA'} size={29} />
          )
        }} />
        <Tab.Screen name="TelasProfile"  component={TelasProfile} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="account" color={focused ? '#0FD06F' : '#BABABA'} size={29} />
          )
        }} />
      </Tab.Navigator>
    </>

  );
}