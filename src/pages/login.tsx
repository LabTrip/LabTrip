import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Login({}) {
  const navigation = useNavigation();
  const [email, onChangeTextEmail] = React.useState('');
  const [senha, onChangeTextSenha] = React.useState('');
  return (
    <View style={styles.container}>
      <Image source={require('../imgs/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Olá!</Text>
      <Text style={styles.title}>Seja bem vindo ao Labtrip.</Text>
      <TextInput placeholder={"seuemail@email.com"} style={styles.input}
      onChangeText={text => onChangeTextEmail(text)} value={email} />
      <TextInput placeholder={"Senha"} style={styles.input} secureTextEntry={true}
      onChangeText={text => onChangeTextSenha(text)} value={senha} />
      <TouchableOpacity style={styles.botaoLogin} onPress={() => alert('email: ' + email + ', senha: ' + senha)}>
        <Text style={styles.botaoLoginTexto}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RedefinirInserirEmail')}>
      <Text style={styles.link} >
        Esqueceu sua senha?
      </Text>
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
  title: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
  logo: {
    width: 192,
    height: 58,
    marginBottom: 15
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
  botaoLogin: {
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
  botaoLoginTexto: {
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
