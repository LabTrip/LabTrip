import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, RefreshControlComponent, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker'

interface Usuario {
  nome: string,
  email: string,
  dataNascimento: string,
  senha: string;
  perfilId: string;
  telefone: string;
}

interface Perfil {
  descricao: string,
  id: string
}


export default function CriarUsuario() {

  const navigation = useNavigation(); 
  const [perfil, setPerfis] = useState<Perfil[]>();
  let token
  const [Token, setToken] = useState();
  const [selectedValue, setSelectedValue] = useState(2);
  const [nomeUsuario, onChangeTextnomeUsuario] = React.useState('');
  const [email, onChangeTextEmail] = React.useState('');
  const [dataNascimento, onChangeTextDataNascimento] = React.useState('');
  const [telefone, onChangeTextTelefone] = React.useState('');

  const [dataNasc, setDataNasc] = useState(new Date())

  useEffect(() => {
    const request = async () => {
      try {
        const value = await AsyncStorage.getItem('AUTH');
        if (value != null) {          
          token = JSON.parse(value)
          console.log(token)
          setToken(token)
          const response = await getPerfis();
          const json = await response.json();
          if (response.status == 200) {
            setPerfis(json);
          }
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    request()

  }, []);



  const criaUsuario = async (corpo, Token ) => {
    return await fetch('https://labtrip-backend.herokuapp.com/usuarios', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': Token
      },
      body: JSON.stringify(corpo)
    });
  }

  const buscaUsuario = async (email, Token) => {
    return await fetch('https://labtrip-backend.herokuapp.com/usuarios/' + email, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': Token
      }
    });
  }

  const getPerfis = async () => {
    return await fetch('https://labtrip-backend.herokuapp.com/perfis/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
  }

  async function verificaCamposPrenchidos(){
    if(nomeUsuario=='' || email=='' ||  telefone=='' ||
       nomeUsuario==undefined || email==undefined || dataNasc==undefined || telefone==undefined){
      alert("Preencha todos os campos para prosseguir com o cadastro")
      return false;
    }else
      return true
  }



  return (
    <View style={styles.container}> 
      <TextInput placeholder={"Nome"} style={styles.input}
        autoCompleteType={'name'} 
        onChangeText={text => onChangeTextnomeUsuario(text.trim())} value={nomeUsuario} autoCapitalize={'none'} />
      <TextInput placeholder={"E-mail"} style={styles.input} 
        keyboardType = "email-address"
        onChangeText={text => onChangeTextEmail(text.trim())} value={email}  autoCapitalize={'none'}/>

      <View style={styles.containerDataCelular}> 

        <DatePicker 
        placeholder={"Data Nascimento"}  style={styles.inputDataCelular}
        date={dataNasc}
        format="DD-MM-YYYY"
        minDate="01-01-1900"
        onDateChange={setDataNasc}/>     


        <TextInput placeholder={"Celular"} style={styles.inputDataCelular}
          keyboardType='numeric'  
          onChangeText={text => onChangeTextTelefone(text.trim())} value={telefone} />
      </View>
    <Text style={styles.label}>Tipo de usuário:</Text>
      <Picker style={styles.pickerComponente}
        prompt="Tipo de usuário"
        mode="dropdown"        
        
        selectedValue={selectedValue}
        onValueChange={(itemValue, value) => {
          setSelectedValue(itemValue)
        }}>

        <Picker.Item label="Gerente" value={2} />
        <Picker.Item label="Agente" value={3} />
        <Picker.Item label="Viajante" value={4} />


        
      </Picker>

      <TouchableOpacity style={styles.botaoCadastrar} onPress={async () => {
        console.log(nomeUsuario)
        console.log(email)
        console.log(dataNasc)
        console.log(telefone)
        console.log(Token)
        console.log(selectedValue)


        let prosseguir = await verificaCamposPrenchidos();

        if(prosseguir){
          let responseConsultaEmail = await buscaUsuario(email, Token);
  
          if(responseConsultaEmail.status == 200){
            alert('Já existe um usuário cadastrado com esses dados!')
             
          }else{
            let response = await criaUsuario({
               nome: nomeUsuario,
               email: email,
               dataNascimento: dataNasc,
               telefone: telefone,
               perfilId:selectedValue
              }, Token);

            let json = await response.json();
            if (response.status >= 200 && response.status <= 299) {
              alert('Usuário cadastrado com sucesso!')
              navigation.goBack();
            }else{
              alert(json.mensagem);
            }
          }
        }
      }}>
        <Text style={styles.botaoCadastrarTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: '3%',
    width: '95%',
    padding: 15,
    fontSize: 16,
    borderRadius: 41,
    backgroundColor: '#EBEBEB',
    color: '#333333'
  },
  containerDataCelular: {
    flexDirection: 'row',
  },
  inputDataCelular: {
    marginTop: '3%',
    marginHorizontal: '2%',
    padding: 15,
    fontSize: 16,
    borderRadius: 41,
    backgroundColor: '#EBEBEB',
    color: '#333333',
    width: '45%'
  },
  pickerComponente: {
    marginTop: '3%',
    width: '95%',
    padding: 15,
    fontSize: 16,
    borderRadius: 41,
    backgroundColor: '#EBEBEB',
    color: '#333333'
  },
  label:{
    fontSize: 16,
    color: '#333333',
    marginTop: '3%'
  },
  botaoCadastrar: {
    backgroundColor: '#3385FF',
    width: 180,
    height: 50,
    padding: 10,
    borderRadius: 40,
    marginTop: '5%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  },
  botaoCadastrarTexto: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 24
  }
});