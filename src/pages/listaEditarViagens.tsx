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
    <View style={{ width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <BarraPesquisa texto={'Pesquisar viagem...'}z/>
      <ScrollView>
        <View style={styles.conteudo}>
          <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarViagem')}>
            <Image source={require('../imgs/plus-circle.png')} />
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
      <StatusBar style="auto" />
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
  botaoMais: {
    marginTop: 20,
  }
});
