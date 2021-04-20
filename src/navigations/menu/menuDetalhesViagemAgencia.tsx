import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import DetalhesRoteiro from '../../pages/listaViagens/detalhesRoteiro'
import MenuOrcamento from './menuOrcamento';
import DetalhesParticipantes from '../../pages/listaViagens/detalhesParticipantes';
import normalize from '../../components/fontSizeResponsive';
import EditarViagem from '../../pages/laboratorio/editarViagem'

const Tab = createMaterialTopTabNavigator();

export default function MenuDetalhesViagemAgencia({ route }) {
    const { viagem } = route.params;
    return (
        <Tab.Navigator tabBarOptions={{
            labelStyle: {
                fontSize: normalize(9),
                fontWeight: 'bold',
                flexWrap: 'nowrap'
            },
            tabStyle: { flexWrap: 'nowrap' }
        }}>
            <Tab.Screen name="Viagem" initialParams={route.params} component={EditarViagem} />
            <Tab.Screen name="Roteiro" component={DetalhesRoteiro} />
            <Tab.Screen name="Orçamento" component={MenuOrcamento} />
            <Tab.Screen name="Participantes" component={DetalhesParticipantes} />
        </Tab.Navigator>
    );
}