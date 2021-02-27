import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MenuLaboratorio from '../menu/menuLaboratorio';
import CriarViagem from '../../pages/laboratorio/criarViagem';
import EditarViagem from '../../pages/laboratorio/editarViagem';
import CadastroAgencias from '../../pages/laboratorio/cadastroAgencias';
import CadastroUsuarios from '../../pages/laboratorio/cadastroUsuarios';
import CriarAgencia from '../../pages/laboratorio/criarAgencia';
import CriarUsuario from '../../pages/laboratorio/criarUsuario';

const { Navigator, Screen } = createStackNavigator();

export default function TelasLaboratorio() {
  return (
    <Navigator>
      <Screen name="Laboratorio" options={{ headerShown: false }} component={MenuLaboratorio} />
      <Screen name="CriarViagem" component={CriarViagem} />
      <Screen name="EditarViagem" component={EditarViagem} />
      <Screen name="CadastrarAgencia" component={CadastroAgencias} />
      <Screen name="CadastrarUsuario" component={CadastroUsuarios} />
      <Screen name="CriarAgencia" component={CriarAgencia} />
      <Screen name="CriarUsuario" component={CriarUsuario} />
    </Navigator>
  );
}