import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RedefinirInserirSenha({route}) {
  const {email, codigoVerificacao} = route.params;
  const navigation = useNavigation();
  const [senha, onChangeSenha] = React.useState('');
  const [confirmSenha, onChangeConfirmSenha] = React.useState('');
  const redefine = async () => {
    return fetch('https://labtrip-backend.herokuapp.com/login/redefine',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        codigoVerificacao: codigoVerificacao,
        senha: senha
      })      
    });
  }

  const verificaSenhas = () => {
    if(senha != confirmSenha){
      alert("As senhas não conferem.");
      return false;
    }
    return true;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
        <View style={styles.scrollContainer}>
      <Image source={require('../../imgs/logo.png')} style={styles.logo} />
      <Text style={styles.titulo}>Vamos redefinir sua senha.</Text>
      <Text style={styles.texto}>Insira sua nova senha e a comfirmação.</Text>
      <TextInput placeholder={"Digite a nova senha"} secureTextEntry={true} style={styles.input} 
      onChangeText={text => onChangeSenha(text)} value={senha}/>
      <TextInput placeholder={"Confirme a nova senha"} secureTextEntry={true} style={styles.input} 
      onChangeText={text => onChangeConfirmSenha(text)} value={confirmSenha}/>
      <TouchableOpacity style={styles.botaoRedefinir} onPress={async () => {
        if(verificaSenhas()){
          let response = await redefine();
            let json = await response.json();
            if (response.status >= 200 && response.status <= 299) {
              navigation.navigate('RedefinirSucesso')
            }
            else {
              alert(json.mensagem);
            }
        }
        }}>
        <Text style={styles.botaoRedefinirTexto}>Redefinir</Text>
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
