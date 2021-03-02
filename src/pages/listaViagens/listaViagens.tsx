import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import BarraPesquisa from '../../components/barraPesquisa';
import CardViagem from '../../components/cardViagem';
import AsyncStorage from '@react-native-async-storage/async-storage';
const moment = require('moment');

interface Viagem {
  id: string,
  descricao: string,
  dataInicio: Date,
  dataFim: Date,
  status: string
}


export default function ListaViagens() {
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

          console.log(token)
          const response = await getViagens();
          const json = await response.json();
          console.log(response.status)
          if (response.status == 200) {
            setViagens(json);
          }
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    request()
  }, [])

  return (
    <View style={styles.conteudo}>
      <BarraPesquisa texto="Pesquisar Viagem..." />
      <FlatList
        style={{ flexGrow: 1, flex: 1, flexDirection: 'column' }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={viagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardViagem nome={item.descricao} dataInicio={moment(item.dataInicio).format('DD/MM/yyyy')} dataFim={moment(item.dataFim).format('DD/MM/yyyy')}
            local={""} status={item.status} navigate={"MenuDetalhesViagem"} item={item} />
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
