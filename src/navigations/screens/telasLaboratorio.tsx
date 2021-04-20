import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MenuLaboratorio from '../menu/menuLaboratorio';
import CriarViagem from '../../pages/laboratorio/criarViagem';
import EditarViagem from '../../pages/laboratorio/editarViagem';
import CadastroAgencias from '../../pages/laboratorio/cadastroAgencias';
import CadastroUsuarios from '../../pages/laboratorio/cadastroUsuarios';
import CriarAgencia from '../../pages/laboratorio/criarAgencia';
import CriarUsuario from '../../pages/laboratorio/criarUsuario';
import EditarAgencia from '../../pages/laboratorio/editarAgencia'; 
import EditarUsuario from '../../pages/laboratorio/editarUsuario';
import MenuDetalhesViagemAgencia from '../menu/menuDetalhesViagemAgencia'

const { Navigator, Screen } = createStackNavigator();

export default function TelasLaboratorio() {
  return (
    <Navigator>
      <Screen name="Laboratorio" options={{ headerShown: false }} component={MenuLaboratorio} />
      <Screen name="CriarViagem" options={{ title: 'Criar viagem'}} component={CriarViagem} />
      <Screen name="EditarViagem" options={{ title: 'Editar viagem'}} component={EditarViagem} />
      <Screen name="CadastrarAgencia" component={CadastroAgencias} />
      <Screen name="CadastrarUsuario" component={CadastroUsuarios} />
      <Screen name="CriarAgencia" options={{ title: 'Criar agência'}} component={CriarAgencia} />
      <Screen name="CriarUsuario" options={{ title: 'Criar usuário'}} component={CriarUsuario} />
      <Screen name="EditarAgencia" options={{ title: 'Editar agencia'}} component={EditarAgencia} />
      <Screen name="EditarUsuario" options={{ title: 'Editar usuário'}} component={EditarUsuario} />
      <Screen name="MenuDetalhesViagemAgencia" options={{ title: 'Editar viagem'}} component={MenuDetalhesViagemAgencia} />
    </Navigator>
  );
}