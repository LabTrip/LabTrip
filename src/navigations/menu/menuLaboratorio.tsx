import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import ListaEditarViagens from '../../pages/laboratorio/listaEditarViagens';
import LaboratorioCadastro from './menuLaboratorioCadastro';

const Tab = createMaterialTopTabNavigator();

export default function Laboratorio() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Viagens" component={ListaEditarViagens} />
      <Tab.Screen name="Cadastros" component={LaboratorioCadastro} />
    </Tab.Navigator>
  );
}