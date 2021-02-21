import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RedefinirInserirEmail() {
  const navigation = useNavigation();
  const [email, onChangeTextEmail] = React.useState('');
  const geraCodigo = async () => {
    return fetch('https://labtrip-backend.herokuapp.com/login/geracodigo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    });
  }
  return (
    <SafeAreaView style={styles.container}>
        <Image source={require('../../imgs/logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>Vamos redefinir sua senha.</Text>
        <Text style={styles.texto}>Insira o e-mail cadastrado.</Text>
        <TextInput placeholder={"seuemail@email.com"} style={styles.input}
          onChangeText={text => onChangeTextEmail(text.trim())} value={email} />
        <TouchableOpacity style={styles.botaoConfirmar} onPress={() => {
          geraCodigo().then(response => {
            console.log(response.status)
            return response.json();
          }).then((json) => {
            if (json.codigo == "200") {
              console.log("Autenticação ok");
              navigation.navigate('RedefinirInserirCodigo', { email: email });
            }
            else {
              console.log("E-mail não cadastrado!");
              alert(json.erro);
            }
          });
        }}>
          <Text style={styles.botaoLoginTexto}>Confirmar</Text>
        </TouchableOpacity>
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
  botaoConfirmar: {
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
