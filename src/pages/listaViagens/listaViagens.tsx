import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import BarraPesquisa from '../../components/barraPesquisa';
import CardViagem from '../../components/cardViagem';

export default function ListaViagens() {

  return (
    <View style={{ flex: 1 }}>
      <BarraPesquisa texto="Pesquisar Viagem..." />
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.conteudo} >
          <CardViagem nome="Fim de semana em Ubatuba" dataInicio="26/02/2021"
            dataFim="28/02/2021" local="Ubatuba - SP" status="Agendada" navigate="MenuDetalhesViagem" />
          <CardViagem nome="Fim de semana em Ubatuba" dataInicio="26/02/2021"
            dataFim="28/02/2021" local="Ubatuba - SP" status="Em andamento" navigate="MenuDetalhesViagem" />
          <CardViagem nome="Fim de semana em Ubatuba" dataInicio="26/02/2021"
            dataFim="28/02/2021" local="Ubatuba - SP" status="Concluida" navigate="MenuDetalhesViagem" />
            <CardViagem nome="Fim de semana em Ubatuba" dataInicio="26/02/2021"
            dataFim="28/02/2021" local="Ubatuba - SP" status="Cancelada" navigate="MenuDetalhesViagem" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
