import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from './login';
import RedefinirSucesso from './redefinirSucesso';

const Tab = createMaterialBottomTabNavigator();



export default function ListaViagens() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.cabecalho}>
        <Image source={require('../imgs/logo.png')} style={styles.logo} />
      </View>
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
      </View>
      </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuIcones} onPress={() => alert('clicou no sino')}>
          <Image source={require('../imgs/bell.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcones} onPress={() => alert('clicou no edit')}>
          <Image source={require('../imgs/edit-2.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcones} onPress={() => alert('clicou no aviao')}>
          <Image source={require('../imgs/plane-solid.png')} style={{ width: 29, height: 29 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcones} onPress={() => alert('clicou no msgs')}>
          <Image source={require('../imgs/message-square.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcones} onPress={() => alert('clicou no user')}>
          <Image source={require('../imgs/user.png')} />
        </TouchableOpacity>
      </View>
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
    height: 614,
  },
  logo: {
    width: 128,
    height: 39,
    marginTop: 15,
  },
  icon: {
    width: 100,
    height: 100,
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
  }
});
