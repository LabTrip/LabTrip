import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import CadastroAgencias from '../../pages/laboratorio/cadastroAgencias';
import CadastroUsuarios from '../../pages/laboratorio/cadastroUsuarios';

const Tab = createMaterialTopTabNavigator();

export default function MenuLaboratorioCadastro() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Agência" component={CadastroAgencias} />
      <Tab.Screen name="Usuário" component={CadastroUsuarios} />
      
    </Tab.Navigator>
  );
}