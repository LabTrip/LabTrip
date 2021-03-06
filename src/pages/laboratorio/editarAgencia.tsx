import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardAgente from '../../components/cardAgente'
import ScrollViewFlat from '../../components/scrollViewFlat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BotaoLupa from '../../components/botaoLupa'


interface Usuario {
  id: string,
  nome: string,
  email: string
}

interface Funcionario {
  usuarioId: string,
  nome: string,
  email: string
}

export default function EditarAgencia({route}) {
  const {agencia} = route.params;
  
  const navigation = useNavigation();
  let token;
  let nomeAgencia = agencia.nome;
  function onChangeTextnomeAgencia(text) {
    nomeAgencia = text;
  }
  let email;
  function onChangeTextEmail(text) {
    email = text;
  }
  const [participantes, setParticipantes] = useState<Funcionario[]>([]);
  const [participantesAdicionados, setParticipantesAdicionados] = useState<Usuario[]>([]);
  const [participantesRemovidos, setParticipantesRemovidos] = useState<Usuario[]>([]);

  const editaAgencia = async (corpo) => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/'+agencia.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(corpo)
    });
  }

  const removeParticipanteArray = (index) =>  {
    let participantesAux = participantes;
    participantesAux.splice(index,1) 
    setParticipantes(participantesAux);
  }

  const adicionaParticipanteArray = (usuarios) =>  {
    let participantesAux = participantes;
    
    setParticipantes(participantes.concat(participantesAux));
  }

  useEffect(() => {
    const request = async () => {
      try {
        const value = await AsyncStorage.getItem('AUTH');
        if (value != null) {
          token = JSON.parse(value)
          const response = await buscaFuncionarios();
          const json = await response.json();
          if (response.status == 200) {
            console.log(json.funcionarios)
            setParticipantes(json.funcionarios);
          }
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    request()
  }, []);

  const buscaUsuario = async (email) => {
    return await fetch('https://labtrip-backend.herokuapp.com/usuarios/email/' + email, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token.toString()
      }
    });
  }

  const convidaFuncionarios = async (corpo) => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/convida-funcionarios/' + agencia.id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(corpo)
    });
  }

  const buscaFuncionarios = async () => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/funcionarios/' + agencia.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
  }

  const deletaFuncionarios = async (corpo) => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/convida-funcionarios/' + agencia.id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(corpo)
    });
  }

  return (
    <View style={styles.container}>
      <ScrollViewFlat>
        <View style={{ alignItems: 'center' }}>
          <TextInput placeholder='Nome da agencia' style={styles.input}
            onChangeText={text => onChangeTextnomeAgencia(text.trim())} value={nomeAgencia} autoCapitalize={'none'} />
          <View style={styles.containerAddFuncionarios}>
            <TextInput placeholder={"Adicionar Funcionarios"} style={styles.inputAddFuncionario}
             onChangeText={text => onChangeTextEmail(text.trim())} value={email} />

            <BotaoLupa onPress={async () => {
                const reponseUsuario = await buscaUsuario(email);
                const jsonUsuario = await reponseUsuario.json();
                if(reponseUsuario.status >= 200 && reponseUsuario.status <= 304){
                  //console.log(jsonUsuario)
                  let participantesAux = participantes;
                  setParticipantes(participantes.concat(jsonUsuario));
                  let participantesAdicionadosAux = participantesAdicionados;
                  setParticipantesAdicionados(participantesAdicionados.concat(jsonUsuario));
                  //console.log(participantes)
                }
                else{
                  //console.log(jsonUsuario)
                  alert("Erro ao buscar usuário.")
                }
              
            }} />
          </View>
            <FlatList 
              data={participantes}
              keyExtractor={(item, index) => item.usuarioId}
              renderItem={({ item, index }) => (
                <CardAgente nome={item.nome} onPress={() => {
                  let participantesAux = participantes;
                  participantesAux.splice(index,1) 
                  setParticipantes(participantesAux);
                }} />
              )}
              extraData={participantes}
            />

          <TouchableOpacity style={styles.botaoSalvar} onPress={async () => {
            let response = await editaAgencia({ nome: nomeAgencia });
            let json = await response.json();
            if (response.status >= 200 && response.status <= 299) {
              alert('Agencia salva com sucesso!')
              if(participantesAdicionados.length > 0){
                let responseP = await convidaFuncionarios(participantes);
                let jsonP = await responseP.json();

                if (responseP.status >= 200 && response.status <= 299) {
                  alert('Participantes adicionados com sucesso!')
                }
                 else{
                  alert('Erro ao adicionados participantes.')
                }
              }
              
              if(participantesRemovidos.length > 0){
                let responseP = await deletaFuncionarios(participantes);
                let jsonP = await responseP.json();

                if (responseP.status >= 200 && response.status <= 299) {
                  alert('Participantes deletados com sucesso!')
                }
                 else{
                  alert('Erro ao deletar participantes.')
                }
              }

              navigation.goBack();
            }
            else {
              alert(json.mensagem);
            }
          }}>
            <Text style={styles.botaoSalvarTexto}>Salvar agencia</Text>
          </TouchableOpacity>
        </View>
      </ScrollViewFlat>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  inputAddFuncionario: {
    marginTop: '3%',
    width: '85%',
    height: 'auto',
    padding: 15,
    fontSize: 16,
    borderRadius: 41,
    backgroundColor: '#EBEBEB',
    color: '#333333'
  },
  containerAddFuncionarios: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerFuncionarios: {
    borderStyle: 'dotted',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  botaoSalvar: {
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
  botaoSalvarTexto: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 24
  }
});