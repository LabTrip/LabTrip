import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BarraPesquisa from '../../components/barraPesquisa';
import CardViagem from '../../components/cardViagem';


const Tab = createMaterialBottomTabNavigator();

export default function ListaEditarViagens() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <BarraPesquisa texto={'Pesquisar viagem...'} />
      <ScrollView>
        <View style={styles.conteudo}>
          <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarViagem')}>
            <Image source={require('../../imgs/plus-circle.png')} />
          </TouchableOpacity>
          <CardViagem nome="Fim de semana em Ubatuba" dataInicio="26/02/2021"
            dataFim="28/02/2021" local="Ubatuba - SP" status="Agendada" navigate="EditarViagem" />
          <CardViagem nome="Fim de semana em Ubatuba" dataInicio="26/02/2021"
            dataFim="28/02/2021" local="Ubatuba - SP" status="Em andamento" navigate="EditarViagem" />
          <CardViagem nome="Fim de semana em Ubatuba" dataInicio="26/02/2021"
            dataFim="28/02/2021" local="Ubatuba - SP" status="Concluida" navigate="EditarViagem" />
          <CardViagem nome="Fim de semana em Ubatuba" dataInicio="26/02/2021"
            dataFim="28/02/2021" local="Ubatuba - SP" status="Cancelada" navigate="EditarViagem" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  botaoMais: {
    marginTop: 20,
  }
});
