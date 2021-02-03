import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { Text} from 'react-native';
import ListaEditarViagens from '../pages/listaEditarViagens';
import BarraPesquisa from '../components/barraPesquisa';

const Tab = createMaterialTopTabNavigator();

function Viagens() {
  return (
    (
      <Text>Cadastros</Text>
    )
  )
}

function Cadastros() {
  return (
    <Text>Cadastros</Text>
  )
}


export default function Laboratorio() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Viagens" component={ListaEditarViagens} />
      <Tab.Screen name="Cadastros" component={Cadastros} />
    </Tab.Navigator>
  );
}