import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Laboratorio from './menuLaboratorio';
import CriarViagem from '../pages/criarViagem';
import EditarViagem from '../pages/editarViagem';

const { Navigator, Screen } = createStackNavigator();

export default function TelasLaboratorio() {
  return (
    <Navigator>
      <Screen name="Laboratorio" options={{ headerShown: false }} component={Laboratorio} />
      <Screen name="CriarViagem" component={CriarViagem} />
      <Screen name="EditarViagem" component={EditarViagem} />
    </Navigator>
  );
}