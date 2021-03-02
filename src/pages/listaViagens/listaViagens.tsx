import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import BarraPesquisa from '../../components/barraPesquisa';
import CardViagem from '../../components/cardViagem';

export default function ListaViagens() {

  let viagensData = [
    {
      id: 'a6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      nome: "Fim de semana em Ubatuba",
      dataInicio: "26/02/2021",
      dataFim: "28/02/2021",
      local: "Ubatuba - SP",
      status: "Agendada",
      navigate: "MenuDetalhesViagem"
    },
    {
      id: 'a6b86b273ff34fce19d6b804efaaaf5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      nome: "Fim de semana em Ubatuba",
      dataInicio: "26/02/2021",
      dataFim: "28/02/2021",
      local: "Ubatuba - SP",
      status: "Em andamento",
      navigate: "MenuDetalhesViagem"
    },
    {
      id: '4e07408562bedb8b60aaaace05c1decfe3ad16b72230967de01f640b7e4729b49fce',
      nome: "Fim de semana em Ubatuba",
      dataInicio: "26/02/2021",
      dataFim: "28/02/2021",
      local: "Ubatuba - SP",
      status: "Concluida",
      navigate: "MenuDetalhesViagem"
    },
    {
      id: '4e07408562bedb8b60ce05c1decfe3ad16b72230961fe01f640b7e4729baaa49fce',
      nome: "Fim de semana em Ubatuba",
      dataInicio: "26/02/2021",
      dataFim: "28/02/2021",
      local: "Ubatuba - SP",
      status: "Cancelada",
      navigate: "MenuDetalhesViagem"
    }
  ];

  return (
    <View style={styles.conteudo}>
      <BarraPesquisa texto="Pesquisar Viagem..." />
      <FlatList
        style={{ flexGrow: 1, flex: 1, flexDirection: 'column' }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={viagensData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardViagem nome={item.nome} dataInicio={item.dataInicio} dataFim={item.dataFim}
            local={item.local} status={item.status} navigate={item.navigate} item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
});
