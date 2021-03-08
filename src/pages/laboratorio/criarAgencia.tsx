import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardAgente from '../../components/cardAgente'
import ScrollViewFlat from '../../components/scrollViewFlat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BotaoLupa from '../../components/botaoLupa'
import { DataTable } from 'react-native-paper';
import LinhaOpcaoUsuario from '../../components/linhaOpcaoUsuario';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Usuario {
  id: string,
  nome: string,
  email: string
}

export default function CriarAgencia() {
  
  const navigation = useNavigation();
  let token;
  const [tokken, setTokken] = useState('');
  const [nomeAgencia, onChangeTextnomeAgencia] = useState('');
  const [email, onChangeTextEmail] = useState('');
  const [idAgencia, setIdAgencia] = React.useState('');
  const [participantes, setParticipantes] = useState<Usuario[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const criaAgencia = async (corpo) => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': tokken
      },
      body: JSON.stringify(corpo)
    });
  }

  useEffect(() => {
    const request = async () => {
      try {
        const value = await AsyncStorage.getItem('AUTH');
        if (value != null) {
          await setTokken(JSON.parse(value))
          token = JSON.parse(value)
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
        'x-access-token': tokken
      }
    });
  }

  const convidaFuncionarios = async (corpo, agenciaId) => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/convida-funcionarios/' + agenciaId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': tokken
      },
      body: JSON.stringify(corpo)
    });
  }

  const handleRemoveItem = async (index) => {
    var participantesAux = participantes;
    let aux = participantesAux.splice(index,1)
    if(participantesAux.length == 0){
      setParticipantes([])
    } else{
      await setParticipantes([])
      await setParticipantes(participantesAux)
    }
    
  }

  const icon = 'close-thick', color = 'red';

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <TextInput placeholder='Nome da agencia' style={styles.input} value={nomeAgencia}
            onChangeText={text => onChangeTextnomeAgencia(text)}   />
          <View style={styles.containerAddFuncionarios}>
            <TextInput placeholder={"Adicionar Funcionarios"} style={styles.inputAddFuncionario}
             onChangeText={text => onChangeTextEmail(text.trim())} value={email} autoCapitalize={'none'} />

            <BotaoLupa onPress={async () => {
                const reponseUsuario = await buscaUsuario(email);
                const jsonUsuario = await reponseUsuario.json();
                if(reponseUsuario.status >= 200 && reponseUsuario.status <= 304){
                  //console.log(jsonUsuario)
                  if(jsonUsuario.length > 0){
                    await setUsuarios(jsonUsuario);
                  }
                }
                else{
                  //console.log(jsonUsuario)
                  alert("Erro ao buscar usuário.")
                }
              
            }} />
          </View>

          <DataTable >          
          <ScrollView>
          {

            usuarios.map((p, index) => {
              return (
                <LinhaOpcaoUsuario 
                  key={p.id} 
                  nome={p.nome} 
                  navigate={"EditarAgencia"} item={p}
                  onPress={() => {
                    let adicionar = true;
                    participantes.map(participante => {
                      if(p.id == participante.id){
                        adicionar = false;
                      }
                    })
                    if(adicionar){
                      let participantesAux = participantes;
                      setParticipantes(participantesAux.concat(p));
                    }
                    else{
                      alert("Este usuário já foi inserido.")
                    }
                    
                    setUsuarios([])
                  }}
                />
              )
            })
          }
          </ScrollView>
        </DataTable>

            <ScrollView>
            {
              participantes.map((p, index) => {
                return (<View style={styles.cardParticipante} key={p.id}>
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
                )
              })
            }
          </ScrollView>

          <TouchableOpacity style={styles.botaoSalvar} onPress={async () => {
            let response = await criaAgencia({ nome: nomeAgencia });
            let json = await response.json();
            if (response.status >= 200 && response.status <= 299) {
              alert('Agencia criada com sucesso!')
              await setIdAgencia(json.id)
              if(participantes.length > 0){
                let responseP = await convidaFuncionarios(participantes,json.id);
                let jsonP = await responseP.json();

                if (responseP.status >= 200 && response.status <= 299) {
                  alert('Participantes adicionados com sucesso!')
                }
                else{
                  alert('Erro ao adicionados participantes.')
                }
              }              

              navigation.goBack();
            }
            else {
              alert(json.mensagem);
            }
          }}>
            <Text style={styles.botaoSalvarTexto}>Criar agencia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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