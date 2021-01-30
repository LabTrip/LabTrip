import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RedefinirInserirSenha() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../imgs/logo.png')} style={styles.logo} />
      <Text style={styles.titulo}>Vamos redefinir sua senha.</Text>
      <Text style={styles.texto}>Insira sua nova senha e a comfirmação.</Text>
      <TextInput placeholder={"Digite a nova senha"} secureTextEntry={true} style={styles.input} />
      <TextInput placeholder={"Confirme a nova senha"} secureTextEntry={true} style={styles.input} />
      <TouchableOpacity style={styles.botaoRedefinir} onPress={() => navigation.navigate('RedefinirSucesso')}>
        <Text style={styles.botaoRedefinirTexto}>Redefinir</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3385FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
  texto: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
  logo: {
    width: 192,
    height: 58,
    marginBottom: 50
  },
  input: {
    marginTop: 20,
    padding: 10,
    width: 300,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 32,
  },
  botaoRedefinir: {
    backgroundColor: '#0FD06F',
    width: 144,
    height: 50,

    padding: 10,
    borderRadius: 40,
    marginTop: 30,

    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  botaoRedefinirTexto: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 24,
  },
  link: {
    fontSize: 20,
    marginTop: 30,
    textDecorationLine: 'underline',
    color: '#fff'
  }
});
