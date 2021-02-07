import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Text} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function Usuarios() {
  return (
    (
      <Text>Usuários</Text>
    )
  )
}

function Agencias() {
  return (
    <Text>Agências</Text>
  )
}

export default function LaboratorioCadastro() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Usuários" component={Usuarios} />
      <Tab.Screen name="Agências" component={Agencias} />
    </Tab.Navigator>
  );
}