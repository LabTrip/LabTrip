import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export default function ListaViagens() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.cabecalho}>
        <Image source={require('../imgs/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.barra}>
        <TextInput placeholder={'Pesquisar viagem...'} value={this.state} style={styles.input} />
        <Image source={require('../imgs/filter.svg')} />
        <TouchableOpacity onPress={() => alert('clicou no filtro')}>
          <Image source={require('../imgs/filter.svg')} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
  </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  barra: {
    width: '100%',
    marginTop: 7,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'center',
    
  },
  cabecalho: {
    backgroundColor: '#fff',
    marginTop: 'auto',
    width: '100%',
    height: 59,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: 128,
    height: 39,
    marginBottom: 50
  },
  icon: {
    width: 100,
    height: 100,
  },
  input: {
    padding: 10,
    width: 288,
    height: 40,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 32,
  }
});
