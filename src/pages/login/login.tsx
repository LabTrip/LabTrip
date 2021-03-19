import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, ActivityIndicator, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { i18n } from '../../translate/i18n';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  const navigation = useNavigation();
  const [email, onChangeTextEmail] = React.useState('');
  const [senha, onChangeTextSenha] = React.useState('');
  const [token, setToken] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [showLoader, setShowLoader] = React.useState(false);
  const auth = async () => {
    return await fetch('https://labtrip-backend.herokuapp.com/login', {
      method: 'POST',
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

  const storeData = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      alert(e)
    }
  }

  const validaSessao = async (token) => {
    return await fetch('https://labtrip-backend.herokuapp.com/login/verifica', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
  }

  const getUsuario = async (token, userId) => {
    return await fetch('https://labtrip-backend.herokuapp.com/usuarios/' + userId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
  }

  useEffect(() => {
    const request = async () => {
      try {
        const value = await AsyncStorage.getItem('AUTH');
        const user = await AsyncStorage.getItem('USER_ID');
        if (value != null && user != null) {
          await setToken(JSON.parse(value));
          await setUserId(JSON.parse(user));
          const response = await validaSessao(JSON.parse(value));
          if (response.status == 200) {
            setShowLoader(true)
            const responseUser = await getUsuario(JSON.parse(value), JSON.parse(user));
            const json = await responseUser.json();
            if (json.perfilId == 4) {
              navigation.dispatch(
                StackActions.replace('MenuPrincipalCliente')
              )
            } else {
              navigation.dispatch(
                StackActions.replace('MenuPrincipal')
              )
            }
          }
          setShowLoader(false)
        }
        else {
          console.log(value)
        }
      }
      catch (e) {
        alert(e)
      }
    }
    request()
  }, []);

  let descErro = null;
  return (
    <SafeAreaView style={styles.container} >
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLoader}
        onRequestClose={() => {
          setShowLoader(!showLoader)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator style={styles.loader} animating={showLoader} size="large" color="#0FD06F" />
            <Text style={styles.textStyle}>
              Aguarde...
            </Text>
          </View>
        </View>
          
      </Modal>
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
        <View style={styles.scrollContainer}>
          <Image source={require('../../imgs/logo.png')} style={styles.logo} />

          <Text style={styles.title}>Olá!</Text>
          <Text style={styles.title}>Seja bem-vindo ao Labtrip.</Text>
          <TextInput placeholder='email@email.com' style={styles.input}
            onChangeText={text => onChangeTextEmail(text.trim())} value={email} autoCapitalize={'none'}
            autoCompleteType={'email'} />
          <TextInput placeholder='senha' style={styles.input} secureTextEntry={true}
            onChangeText={text => onChangeTextSenha(text)} value={senha} autoCompleteType={'password'}
          />
          <TouchableOpacity style={styles.botaoLogin} onPress={async () => {
            setShowLoader(true)
            let response = await auth();
            let json = await response.json();
            if (response.status == 200) {
              storeData(json.token, "AUTH");
              storeData(json.id, "USER_ID");
              if (json.perfilId == 4) {
                navigation.dispatch(
                  StackActions.replace('MenuPrincipalCliente')
                )
              } else {
                navigation.dispatch(
                  StackActions.replace('MenuPrincipal')
                )
              }
              setShowLoader(false)
            }
            else {
              setShowLoader(false)
              alert(json.mensagem);
            }
          }}>
            <Text style={styles.botaoLoginTexto}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RedefinirInserirEmail')}>
            <Text style={styles.link} >
              Esqueceu sua senha?
            </Text>
            <Text style={styles.link} >
              Primeiro acesso?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3385FF',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 40,
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
    color: '#fff',
    textAlign: 'center'
  },
  modal: {
    opacity: 0.5,
    width: 80,
    height: 80
  },
  loader: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 20,
    padding: '20%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  }
});
