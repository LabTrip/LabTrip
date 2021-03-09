import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import BarraPesquisa from '../../components/barraPesquisa';
import CardViagem from '../../components/cardViagem';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Viagem {
  id: string,
  descricao: string,
  dataInicio: Date,
  dataFim: Date,
  statusId: number
}

export default function ListaViagens() {
  const moment = require('moment');
  let token;
  const [viagens, setViagens] = useState<Viagem[]>([])

  const getViagens = async () => {
    return await fetch('https://labtrip-backend.herokuapp.com/viagens', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
  }

  useEffect(() => {
    const request = async () => {
      try {
        const value = await AsyncStorage.getItem('AUTH');
        if (value != null) {
          token = JSON.parse(value)
          const response = await getViagens();
          const json = await response.json();
          if (response.status == 200) {
            setViagens(json);
          }
        }
      }
      catch (e) {
        alert(e)
      }
    }
    request()
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false)
}, [refreshing]);


  return (
    <View style={styles.conteudo}>
      <BarraPesquisa texto="Pesquisar Viagem..." />
      <FlatList
        style={{ flexGrow: 1, flex: 1, flexDirection: 'column' }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={viagens}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <CardViagem nome={item.descricao} dataInicio={moment(item.dataInicio).format('DD/MM/yyyy')}
            dataFim={moment(item.dataFim).format('DD/MM/yyyy')}
            local={""} status={item.statusId} navigate={"MenuDetalhesViagem"} item={item} />
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
