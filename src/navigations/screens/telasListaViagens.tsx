import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MenuDetalhesViagem from '../menu/menuDetalhesViagem';
import ListaViagens from '../../pages/listaViagens/listaViagens';
import DetalhesAtividade from '../../pages/listaViagens/detalhesAtividade';
import ConvidarParticipantes from '../../pages/listaViagens/convidarParticipante';
import EditarOrcamentoPlanejado from '../../pages/listaViagens/editarOrcamentoPlanejado';
import EditarDespesaAdicional from '../../pages/listaViagens/editarDespesaAdicional'
import AdicionarDespesa from '../../pages/listaViagens/adicionarDespesa';

const { Navigator, Screen } = createStackNavigator();

export default function TelasListaViagens() {
    return (
        <Navigator initialRouteName="ListaViagens">
            <Screen name="ListaViagens" options={{ headerShown: false }} component={ListaViagens} />
            <Screen name="MenuDetalhesViagem" options={{ headerShown: false }} component={MenuDetalhesViagem} />
            <Screen name="DetalhesAtividade" options={{title: "Detalhes da atividade"}} component={DetalhesAtividade} />
            <Screen name="ConvidarParticipantes" options={{title: "Convidar participante"}} component={ConvidarParticipantes} />
            <Screen name="EditarOrcamentoPlanejado" options={{title: "Editar orçamento planejado"}} component={EditarOrcamentoPlanejado} />
            <Screen name="EditarDespesaAdicional" options={{title: "Editar despesa adicional"}} component={EditarDespesaAdicional} />
            <Screen name="AdicionarDespesa" options={{title: "Adicionar despesa"}} component={AdicionarDespesa} />
        </Navigator>
    );
}