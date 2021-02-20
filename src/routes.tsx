import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from './pages/login/login';
import RedefinirInserirEmail from './pages/redefinir/redefinirInserirEmail';
import RedefinirInserirCodigo from './pages/redefinir/redefinirInserirCodigo';
import RedefinirInserirSenha from './pages/redefinir/redefinirInserirSenha';
import RedefinirSucesso from './pages/redefinir/redefinirSucesso';
import ListaViagens from './pages/listaViagens/listaViagens';
import MenuPrincipal from './navigations/menu/menuPrincipal';

export default function Routes() {
    return (
        <NavigationContainer independent={true}>
            <Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
                <Screen name="Login" component={Login} />
                <Screen name="ListaViagens" component={ListaViagens} />
                <Screen name="RedefinirInserirEmail" component={RedefinirInserirEmail} />
                <Screen name="RedefinirInserirCodigo" component={RedefinirInserirCodigo} />
                <Screen name="RedefinirInserirSenha" component={RedefinirInserirSenha} />
                <Screen name="RedefinirSucesso" component={RedefinirSucesso} />
                <Screen name="MenuPrincipal" component={MenuPrincipal} />
            </Navigator>
        </NavigationContainer>
    );
}