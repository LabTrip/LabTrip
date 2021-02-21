import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function RedefinirInserirCodigo({route}) {
  const {email} = route.params;
  const navigation = useNavigation();
  const [codigo, onChangeTextCodigo] = React.useState('');
  const verificaCodigo = async () => {
    return fetch('https://labtrip-backend.herokuapp.com/login/verificacodigo',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        codigoVerificacao: codigo
      })      
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../imgs/logo.png')} style={styles.logo} />
      <Text style={styles.titulo}>Vamos redefinir sua senha.</Text>
      <Text style={styles.texto}>Insira o código recebido por e-mail.</Text>
      <TextInput placeholder={"Código"} style={styles.input}
      onChangeText={text => onChangeTextCodigo(text)} value={codigo} />
      <TouchableOpacity style={styles.botaoEnviar} onPress={() => {
        verificaCodigo().then(response => {
          console.log(response.status)
          return response.json();
        }).then((json) => {
          if(json.codigo == "200"){
            console.log("Autenticação ok");
            navigation.navigate('RedefinirInserirSenha',{email: email, codigoVerificacao: codigo});
          }
          else{
            console.log("Código incorreto!");
            console.log(email);
            alert(json.erro);
          }
        });        
        }}>
        <Text style={styles.botaoLoginTexto}>Enviar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
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
    marginTop: 50,
    padding: 10,
    width: 300,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 32,
  },
  botaoEnviar: {
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
