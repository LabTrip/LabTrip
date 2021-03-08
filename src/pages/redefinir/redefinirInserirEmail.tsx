import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
        <View style={styles.scrollContainer}>
          <Image source={require('../../imgs/logo.png')} style={styles.logo} />
          <Text style={styles.titulo}>Vamos redefinir sua senha.</Text>
          <Text style={styles.texto}>Insira o e-mail cadastrado.</Text>
          <TextInput placeholder={"seuemail@email.com"} style={styles.input}
            onChangeText={text => onChangeTextEmail(text.trim())} value={email} autoCapitalize={'none'} autoCompleteType={'email'}/>
          <TouchableOpacity style={styles.botaoConfirmar} onPress={async () => {
            let response = await geraCodigo();
            let json = await response.json();
            if (response.status >= 200 && response.status <= 299) {
              navigation.navigate('RedefinirInserirCodigo', { email: email });
            }
            else {
              alert(json.mensagem);
            }
          }}>
            <Text style={styles.botaoLoginTexto}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar/>
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
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
