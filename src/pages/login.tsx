import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TextComponent  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { i18n } from '../translate/i18n'



export default function Login({}) {
  const navigation = useNavigation();
  const [email, onChangeTextEmail] = React.useState('');
  const [senha, onChangeTextSenha] = React.useState('');
<<<<<<< HEAD
  const auth = async () => {
    return fetch('https://labtrip-backend.herokuapp.com/login',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      })      
    });
  }
  let descErro = null;
=======

>>>>>>> 18c7000ea4913a39299acaf8bcf317c65eab86ce
  return (
    <View style={styles.container}>
      <Image source={require('../imgs/logo.png')} style={styles.logo} />
      <Text style={styles.title}>{i18n.t('login.titulo')}</Text>
      <Text style={styles.title}>{i18n.t('login.saudacao')}</Text>
      <TextInput placeholder= {i18n.t('redefinirSenha.email')} style={styles.input}
      onChangeText={text => onChangeTextEmail(text)} value={email} />
      <TextInput placeholder= {i18n.t('redefinirSenha.senha')} style={styles.input} secureTextEntry={true}
      onChangeText={text => onChangeTextSenha(text)} value={senha} />
<<<<<<< HEAD
      <TouchableOpacity style={styles.botaoLogin} onPress={() => {
          auth().then(response => {
            return response.json();
          }).then((json) => {
            if(json.codigo == "200"){
              console.log("Autenticação ok");
              navigation.navigate('MenuBar');
            }
            else{
              console.log("Credenciais inválidas");
              alert(json.erro);
            }
          });
        }}>
        <Text style={styles.botaoLoginTexto}>Entrar</Text>
=======
      <TouchableOpacity style={styles.botaoLogin} onPress={() => navigation.navigate('MenuBar')}>
        <Text style={styles.botaoLoginTexto}>{i18n.t('botoes.entrar')}</Text>
>>>>>>> 18c7000ea4913a39299acaf8bcf317c65eab86ce
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RedefinirInserirEmail')}>
      <Text style={styles.link} >
      {i18n.t('redefinirSenha.redefinir')}
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
  },
  erro: {
    marginTop: 20,
    fontSize: 20,
    color: '#ff0000',
    display: 'flex'
  }
});
