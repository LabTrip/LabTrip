import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import DetalhesOrcamento from '../../pages/listaViagens/detalhesOrcamento';


const Tab = createMaterialTopTabNavigator();

export default function MenuOrcamento() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Geral" component={DetalhesOrcamento} />
      <Tab.Screen name="Individual" component={DetalhesOrcamento} />
      
    </Tab.Navigator>
  );
}