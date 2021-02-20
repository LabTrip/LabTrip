import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BarraPesquisa from '../../components/barraPesquisa';

const Tab = createMaterialBottomTabNavigator();

export default function ListaViagens() {
  const navigation = useNavigation();
  return (
    <View style={{width: '100%', height: '100%'}}>
      <BarraPesquisa texto="Pesquisar Viagem..." />
      <ScrollView>
        <View style={styles.conteudo} >
        <TouchableOpacity style={styles.cardViagens}>
          <Text>Apelido da viagem</Text>
          <Text>Início: DD/MM/YYYY, Fim: DD/MM/YYYY</Text>
          <Text>Local: Nome do local</Text>
          <Text>Status: status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardViagens}>
          <Text>Apelido da viagem</Text>
          <Text>Início: DD/MM/YYYY, Fim: DD/MM/YYYY</Text>
          <Text>Local: Nome do local</Text>
          <Text>Status: status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardViagens}>
          <Text>Apelido da viagem</Text>
          <Text>Início: DD/MM/YYYY, Fim: DD/MM/YYYY</Text>
          <Text>Local: Nome do local</Text>
          <Text>Status: status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardViagens}>
          <Text>Apelido da viagem</Text>
          <Text>Início: DD/MM/YYYY, Fim: DD/MM/YYYY</Text>
          <Text>Local: Nome do local</Text>
          <Text>Status: status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardViagens}>
          <Text>Apelido da viagem</Text>
          <Text>Início: DD/MM/YYYY, Fim: DD/MM/YYYY</Text>
          <Text>Local: Nome do local</Text>
          <Text>Status: status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardViagens}>
          <Text>Bahia</Text>
          <Text>Início: 10/03/2021, Fim: 25/03/2021</Text>
          <Text>Local: Salvador, BA</Text>
          <Text>Status: Em andamento</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    width: '100%',
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  conteudo: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  input: {
    marginRight: 25,
    width: 266,
    height: 30,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 32,
  },
  cardViagens: {
    marginTop: 25,
    padding: 10,
    backgroundColor: '#FAF7AE',
    borderRadius: 13,
    borderLeftColor: '#F8EC12',
    borderLeftWidth: 6,
    width: '85%',
    height: 143,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
