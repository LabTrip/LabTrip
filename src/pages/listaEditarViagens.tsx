import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BarraPesquisa from '../components/barraPesquisa';

const Tab = createMaterialBottomTabNavigator();

export default function ListaEditarViagens() {
  const navigation = useNavigation();
  return (
    <View>
      <BarraPesquisa texto={'Pesquisar viagem...'} />
      <ScrollView>
        <View style={styles.conteudo}>
          <TouchableOpacity style={styles.botaoMais}>
            <Image source={require('../imgs/plus-circle.png')}/>
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
            <Text>Apelido da viagem</Text>
            <Text>Início: DD/MM/YYYY, Fim: DD/MM/YYYY</Text>
            <Text>Local: Nome do local</Text>
            <Text>Status: status</Text>
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
    marginTop: 30,
    padding: 10,
    backgroundColor: '#F8EC12',
    borderRadius: 13,
    height: 143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoMais: {
    marginTop: 20,
  }
});
