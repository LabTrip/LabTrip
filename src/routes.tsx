import React from 'react';
import 'react-native-gesture-handler';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

import Login from './pages/login';
import RedefinirInserirEmail from './pages/redefinirInserirEmail';
import RedefinirInserirCodigo from './pages/redefinirInserirCodigo';
import RedefinirInserirSenha from './pages/redefinirInserirSenha';
import RedefinirSucesso from './pages/redefinirSucesso';
import ListaViagens from './pages/listaViagens';

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="Login" component={Login}/>
                <Screen name="RedefinirInserirEmail" component={RedefinirInserirEmail}/>
                <Screen name="RedefinirInserirCodigo" component={RedefinirInserirCodigo}/>
                <Screen name="RedefinirInserirSenha" component={RedefinirInserirSenha}/>
                <Screen name="RedefinirSucesso" component={RedefinirSucesso}/>
                <Screen name="ListaViagens" component={ListaViagens}/>
            </Navigator>
        </NavigationContainer>
    );
}