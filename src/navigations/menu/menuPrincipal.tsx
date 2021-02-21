import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import EditarPerfil from '../../pages/profile/editarPerfil';
import Cabecalho from '../../components/cabecalho';
import Notificacoes from '../../pages/notificacoes/notificacoes';
import Mensagens from '../../pages/chat/mensagens';
import TelasLaboratorio from '../screens/telasLaboratorio';
import TelasListaViagens from   '../screens/telasListaViagens';


const Tab = createMaterialBottomTabNavigator();

export default function MenuPrincipal() {
  return (
     <><Cabecalho/>
      
        <Tab.Navigator barStyle={{ backgroundColor: '#fff' }} initialRouteName={"ListaViagens"}>
          <Tab.Screen name="Notificacoes" component={Notificacoes} options={{
            tabBarLabel: '',
            tabBarColor: '#fff',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="bell" color={'#BABABA'} size={29} />
            )
          }} />
          <Tab.Screen name="TelasLaboratorio" component={TelasLaboratorio} options={{
            tabBarLabel: '',
            tabBarColor: '#fff',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="pen" color={'#BABABA'} size={29} />
            )
          }} />
          <Tab.Screen name="TelasListaViagens" component={TelasListaViagens} options={{
            tabBarLabel: '',
            tabBarColor: '#fff',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="airplane" color={'#00ff7b'} size={29} />
            )
          }} />
          <Tab.Screen name="Mensagens" component={Mensagens} options={{
            tabBarLabel: '',
            tabBarColor: '#fff',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="message" color={'#BABABA'} size={29} />
            )
          }} />
          <Tab.Screen name="EditarPerfil" component={EditarPerfil} options={{
            tabBarLabel: '',
            tabBarColor: '#fff',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="account" color={'#BABABA'} size={29} />
            )
          }} />
        </Tab.Navigator>
      </>

  );
}