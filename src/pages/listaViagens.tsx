import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Cabecalho from '../components/cabecalho';
import SafeArea from '../components/safeArea';

const Tab = createMaterialBottomTabNavigator();




export default function ListaViagens() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Cabecalho/>
      <View style={styles.barra}>
        <TextInput placeholder={'Pesquisar viagem...'} style={styles.input} />
        <TouchableOpacity onPress={() => alert('clicou no filtro')}>
          <Image source={require('../imgs/filter.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.conteudo}>
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
        </View>
        </ScrollView>
        <StatusBar/>
        </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  barra: {
    width: '100%',
    marginTop: 5,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  cabecalho: {
    backgroundColor: '#fff',
    height: 59,
    alignItems: 'center',
  },
  conteudo: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  logo: {
    width: 128,
    height: 39,
    marginTop: 15,
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
  menu: {
    backgroundColor: '#fff',
    height: 59,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcones: {
    width: 72,
    alignItems: 'center'
  },
  cardViagens: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#F8EC12',
    borderRadius: 13,
    height: 143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0
}
});
