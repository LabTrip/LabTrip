import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import ListaEditarViagens from '../../pages/laboratorio/listaEditarViagens';
import MenuLaboratorioCadastro from './menuLaboratorioCadastro';

const Tab = createMaterialTopTabNavigator();

export default function MenuLaboratorio() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Viagens" component={ListaEditarViagens} />
      <Tab.Screen name="Cadastros" component={MenuLaboratorioCadastro} />
    </Tab.Navigator>
  );
}