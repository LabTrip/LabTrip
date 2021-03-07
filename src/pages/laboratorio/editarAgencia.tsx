import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardAgente from '../../components/cardAgente'
import ScrollViewFlat from '../../components/scrollViewFlat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BotaoLupa from '../../components/botaoLupa'
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Usuario {
  id: string,
  nome: string,
  email: string
}

interface Funcionario {
  id: string,
  nome: string,
  email: string
}

interface usuario {
    id: string,
    nome: string,
    email: string
}

export default function EditarAgencia({route}) {
  const {agencia} = route.params;
  
  const navigation = useNavigation();
  const [tokken, setTokken] = useState('');
  const [nomeAgencia, setNomeAgencia] = useState(agencia.nome);
  let token;
  const [email, onChangeTextEmail] = useState('');
  const [participantes, setParticipantes] = useState<Funcionario[]>([]);
  const [participantesAdicionados, setParticipantesAdicionados] = useState<usuario[]>([]);
  const [participantesRemovidos, setParticipantesRemovidos] = useState<Funcionario[]>([]);

  const editaAgencia = async (corpo) => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/'+agencia.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': tokken
      },
      body: JSON.stringify(corpo)
    });
  }

  const buscaUsuario = async (email) => {
    return await fetch('https://labtrip-backend.herokuapp.com/usuarios/email/' + email, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': tokken.toString()
      }
    });
  }

  const convidaFuncionarios = async (corpo) => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/convida-funcionarios/' + agencia.id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': tokken
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
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/funcionarios/' + agencia.id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': tokken
      },
      body: JSON.stringify(corpo)
    });
  }

  const icon = 'close-thick', color = 'red';

  const handleRemoveItem = async (index) => {
    var participantesAux = participantes;
    let participantesRemovidosAux = participantesRemovidos;
    let aux = participantesAux.splice(index,1)
    //participantesAux.splice(index,1)
    //participantesRemovidosAux = participantesRemovidosAux.concat(aux[0])
    //console.log('participantesaux: ' + participantesAux)
    setParticipantes(participantesAux)
    setParticipantesRemovidos(participantesRemovidosAux.concat(aux[0]));
    //console.log('Participantes: ' + participantes)
    //console.log('Removidos auxiliar: ' + participantesRemovidosAux)
    //console.log('Removidos real: ' + participantesRemovidos)
  }

  useEffect(() => {
    const request = async () => {
      try {
        const value = await AsyncStorage.getItem('AUTH');
        if (value != null) {
          setTokken(JSON.parse(value))
          token = JSON.parse(value)
          const response = await buscaFuncionarios();
          const json = await response.json();
          if (response.status == 200) {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <TextInput placeholder='Nome da agencia' style={styles.input} 
            onChangeText={texto => setNomeAgencia(texto)} value={nomeAgencia}/>
          <View style={styles.containerAddFuncionarios}>
            <TextInput placeholder={"Adicionar Funcionarios"} style={styles.inputAddFuncionario}
             onChangeText={text => onChangeTextEmail(text.trim())} value={email} autoCapitalize={'none'} />

            <BotaoLupa onPress={async () => {
                const reponseUsuario = await buscaUsuario(email);
                const jsonUsuario = await reponseUsuario.json();
                if(reponseUsuario.status >= 200 && reponseUsuario.status <= 304){
                  //console.log(jsonUsuario)
                  if(jsonUsuario.length > 0){
                    let participantesAux = participantes;
                    let participantesAdicionadosAux = participantesAdicionados;
                    //console.log(participantesAux)
                    const usuario : usuario = jsonUsuario[0]
                    setParticipantes(participantesAux.concat(jsonUsuario[0]));
                    setParticipantesAdicionados(participantesAdicionadosAux.concat(usuario));
                  }
                  //console.log('Participantes: ' + participantes)
                  //console.log('Participantes add: ' + participantesAdicionados)
                }
                else{
                  //console.log(jsonUsuario)
                  alert("Erro ao buscar usuário.")
                }
              
            }} />
          </View>
            
          <ScrollView>
            {
              participantes.map((p, index) => {
                return <View style={styles.cardParticipante} key={p.id}>
                    <Image source={require('../../imgs/perfil.png')} style={styles.fotoPerfil} />
                    <View style={styles.headerCardParticipante}>
                        <Text style={styles.textoParticipante}> {p.nome}</Text>
                    </View>
        
                    <TouchableOpacity onPress={() => {
                      handleRemoveItem(index) 
                    }}>
                      <MaterialCommunityIcons name={icon} color={color} size={30} />
                    </TouchableOpacity>
                  </View>
              })
            }
          </ScrollView>

          <TouchableOpacity style={styles.botaoSalvar} onPress={async () => {
            let response = await editaAgencia({ nome: nomeAgencia });
            let json = await response.json();
            if (response.status >= 200 && response.status <= 299) {
              //console.log('Agencia salva com sucesso!')
              if(participantesAdicionados.length > 0){
                let responseP = await convidaFuncionarios(participantesAdicionados);
                let jsonP = await responseP.json();
                //console.log(participantesAdicionados)
                if (responseP.status >= 200 && response.status <= 299) {
                  alert('Participantes adicionados com sucesso!')
                }
                 else{
                  alert('Erro ao adicionados participantes.')
                }
              }
              //console.log(participantesRemovidos)
              if(participantesRemovidos.length > 0){

                let responseP = await deletaFuncionarios(participantesRemovidos);
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
      </ScrollView>
    </SafeAreaView>
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
    flex: 1,
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
  },
  cardParticipante: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '3%',
    width: '95%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 26,
    marginTop: '3%',
    marginBottom: '3%',
  },
  textoParticipante: {
      color: 'black',
      fontSize: 18,
      width: '60%',
      maxWidth: '60%',
      flexWrap: 'wrap',
      textAlign: 'center'
  },
  headerCardParticipante: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  fotoPerfil: {
      borderRadius: 50,
      width: 60,
      height: 60
  }
});