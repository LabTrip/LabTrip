import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MenuLaboratorio from '../menu/menuLaboratorio';
import CriarViagem from '../../pages/laboratorio/criarViagem';
import EditarViagem from '../../pages/laboratorio/editarViagem';

const { Navigator, Screen } = createStackNavigator();

export default function TelasLaboratorio() {
  return (
    <Navigator>
      <Screen name="Laboratorio" options={{ headerShown: false }} component={MenuLaboratorio} />
      <Screen name="CriarViagem" component={CriarViagem} />
      <Screen name="EditarViagem" component={EditarViagem} />
    </Navigator>
  );
}