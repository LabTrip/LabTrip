import React, { useEffect, useState} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
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


  return (
    <View style={{ flex: 1 }}>
      <BarraPesquisa texto="Pesquisar Viagem..." />
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.conteudo} >
          {
            viagens.map(v => 
              {
                return (<CardViagem key={v.id} nome={v.descricao} dataInicio={moment(v.dataInicio).format('DD/MM/yyyy')}
                dataFim={moment(v.dataFim).format('DD/MM/yyyy')} local="Ubatuba - SP" status={v.status} navigate="MenuDetalhesViagem" />)
              }
            )
          }
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
