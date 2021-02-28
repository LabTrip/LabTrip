import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import DetalhesRoteiro from '../../pages/listaViagens/detalhesRoteiro'
import MenuOrcamento from './menuOrcamento';
import DetalhesParticipantes from '../../pages/listaViagens/detalhesParticipantes';

const Tab = createMaterialTopTabNavigator();

export default function MenuDetalhesViagem() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Roteiro" component={DetalhesRoteiro} />
      <Tab.Screen name="Orçamento" component={MenuOrcamento} />
      <Tab.Screen name="Participantes" component={DetalhesParticipantes} />
    </Tab.Navigator>
  );
}