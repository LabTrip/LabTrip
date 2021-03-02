import React, { useEffect, useState} from 'react';
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
  const [token, setToken] = useState("");
  let tokenn;
  const [viagens, setViagens] = useState<Viagem[]>([])
  const getViagens = async () => {
    return await fetch('https://labtrip-backend.herokuapp.com/viagens', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json',
        'x-access-token': tokenn
      }
    });
  }

  useEffect(() => {
    const request = async () => {
      try{
        const value = await AsyncStorage.getItem('AUTH');
        //setToken(value);
        tokenn = JSON.parse(value)
        console.log(tokenn)
        const response = await getViagens();
        const json = await response.json();
        console.log(response.status)
        if(response.status == 200){
          setViagens(json);
        }
      }
      catch(e){
        console.log(e)
      }
    }

    request()
    
  }, [])


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
