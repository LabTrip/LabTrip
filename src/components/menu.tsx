import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Login from '../pages/login';
import ListaViagens from '../pages/listaViagens';
import RedefinirInserirEmail from '../pages/redefinirInserirEmail';
import RedefinirInserirCodigo from '../pages/redefinirInserirCodigo';
import RedefinirInserirSenha from '../pages/redefinirInserirSenha';
import RedefinirSucesso from '../pages/redefinirSucesso';
import CriarAgencia from '../pages/criarAgencia';
import EdicaoPerfil from '../pages/edicaoPerfil';

const Tab = createMaterialBottomTabNavigator();

export default function MenuBar() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator barStyle = { { backgroundColor : '#fff' } }>
        <Tab.Screen name="ListaViagens" component={ListaViagens} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="bell" color={'#BABABA'} size={29} />
          )
        }} />
        <Tab.Screen name="EdicaoPerfil" component={EdicaoPerfil} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="pen" color={'#BABABA'} size={29} />
          )
        }} />
        <Tab.Screen name="RedefinirSucesso" component={RedefinirSucesso} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="airplane" color={'#00ff7b'} size={29} />
          )
        }} />
        <Tab.Screen name="RedefinirInserirSenha" component={RedefinirInserirSenha} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="message" color={'#BABABA'} size={29} />
          )
        }} />
        <Tab.Screen name="RedefinirInserirEmail" component={RedefinirInserirEmail} options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color={'#BABABA'} size={29} />
          )
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#fff'
  }
});