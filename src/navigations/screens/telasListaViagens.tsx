import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MenuDetalhesViagem from '../menu/menuDetalhesViagem';
import ListaViagens from '../../pages/listaViagens/listaViagens';

const { Navigator, Screen } = createStackNavigator();

export default function TelasListaViagens() {
    return (
        <Navigator initialRouteName="ListaViagens">
            <Screen name="ListaViagens" options={{ headerShown: false }} component={ListaViagens} />
            <Screen name="MenuDetalhesViagem" options={{ headerShown: false }} component={MenuDetalhesViagem} />
        </Navigator>
    );
}