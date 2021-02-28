import React from 'react';
import { StyleSheet, Text, Image, TextInput, TouchableOpacity, StatusBar, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RedefinirInserirCodigo({ route }) {
  const { email } = route.params;
  const navigation = useNavigation();
  const [codigo, onChangeTextCodigo] = React.useState('');
  const verificaCodigo = async () => {
    return fetch('https://labtrip-backend.herokuapp.com/login/verificacodigo', {
      method: 'POST',
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
        <View style={styles.scrollContainer}>
          <Image source={require('../../imgs/logo.png')} style={styles.logo} />
          <Text style={styles.titulo}>Vamos redefinir sua senha.</Text>
          <Text style={styles.texto}>Insira o código recebido por e-mail.</Text>
          <TextInput placeholder={"Código"} style={styles.input}
            onChangeText={text => onChangeTextCodigo(text)} value={codigo} />
          <TouchableOpacity style={styles.botaoEnviar} onPress={async () => {
            let response = await verificaCodigo();
            let json = await response.json();
            if (response.status >= 200 && response.status <= 299) {
              navigation.navigate('RedefinirInserirSenha', { email: email, codigoVerificacao: codigo });
            }
            else {
              alert(json.mensagem);
            }
          }}>
            <Text style={styles.botaoLoginTexto}>Enviar</Text>
          </TouchableOpacity>
          <StatusBar />
        </View>
      </ScrollView>
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
    flex: 1,
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
