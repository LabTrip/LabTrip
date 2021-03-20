import React, { useEffect, useState } from 'react';
import { Modal, ActivityIndicator, Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardAgente from '../../components/cardAgente'
import ScrollViewFlat from '../../components/scrollViewFlat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BotaoLupa from '../../components/botaoLupa'
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { DataTable } from 'react-native-paper';
import LinhaOpcaoUsuario from '../../components/linhaOpcaoUsuario';

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
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  let token;
  const [email, onChangeTextEmail] = useState('');
  const [participantes, setParticipantes] = useState<Funcionario[]>([]);
  const [participantesAdicionados, setParticipantesAdicionados] = useState<usuario[]>([]);
  const [participantesRemovidos, setParticipantesRemovidos] = useState<Funcionario[]>([]);
  const [showLoader, setShowLoader] = React.useState(false);

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

  const buscaAgencia = async () => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/'+agencia.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
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
    let participantesAdicionadosAux = participantesAdicionados;
    let aux = participantesAux.splice(index,1)
    setParticipantes(participantesAux)
    setParticipantesRemovidos(participantesRemovidosAux.concat(aux[0]));
    participantesAdicionados.map((p, indexP) =>{
      if(p.id == aux[0].id){
        participantesAdicionadosAux.splice(indexP,1)
      }
    })
    setParticipantesAdicionados(participantesAdicionadosAux)
    setTimeout(() => {
      console.log(participantesAdicionados)
    },5000)
  }

  useEffect(() => {
    const request = async () => {
      try {
        setShowLoader(true);
        const value = await AsyncStorage.getItem('AUTH');
        if (value != null) {
          setTokken(JSON.parse(value))
          token = JSON.parse(value)
          const responseAgencia = await buscaAgencia();
          const jsonAgencia = await responseAgencia.json();
          if (responseAgencia.status == 200) {
            setNomeAgencia(jsonAgencia.nome);
          }
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
      finally{
        setShowLoader(false);
      }
    }
    request()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <TextInput placeholder='Nome da agencia' style={styles.input} 
            onChangeText={texto => setNomeAgencia(texto)} value={nomeAgencia}/>
          <View style={styles.containerAddFuncionarios}>
            <TextInput placeholder={"Adicionar Funcionarios"} style={styles.inputAddFuncionario}
             onChangeText={text => onChangeTextEmail(text.trim())} value={email} autoCapitalize={'none'} />

            <BotaoLupa onPress={async () => {
              try{
                setShowLoader(true);
                await setUsuarios([])
                const reponseUsuario = await buscaUsuario(email);
                const jsonUsuario = await reponseUsuario.json();
                if(reponseUsuario.status >= 200 && reponseUsuario.status <= 304){
                  //console.log(jsonUsuario)
                  if(jsonUsuario.length > 0){
                    await setUsuarios(jsonUsuario);
                  }
                  //console.log('Participantes: ' + participantes)
                  //console.log('Participantes add: ' + participantesAdicionados)
                  console.log('usuarios: ' + usuarios)
                }
                else{
                  //console.log(jsonUsuario)
                  alert("Erro ao buscar usuário.")
                }
              }
              catch(e){
                alert("Erro ao buscar usuário.")
              }
              finally{
                setShowLoader(false);
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
                      let participantesAdicionadosAux = participantesAdicionados;
                      let usuarioAux = usuarios;
                      //console.log(participantesAux)
                      const usuario : usuario = p
                      setParticipantes(participantesAux.concat(p));
                      setParticipantesAdicionados(participantesAdicionadosAux.concat(usuario));
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
            try{
              setShowLoader(true);
              let response = await editaAgencia({ nome: nomeAgencia });
              let json = await response.json();
              if (response.status >= 200 && response.status <= 299) {
                //console.log('Agencia salva com sucesso!')
                if(participantesAdicionados.length > 0){
                  let responseP = await convidaFuncionarios(participantesAdicionados);
                  let jsonP = await responseP.json();
                  //console.log(participantesAdicionados)
                  
                }
                //console.log(participantesRemovidos)
                if(participantesRemovidos.length > 0){

                  let responseP = await deletaFuncionarios(participantesRemovidos);
                  let jsonP = await responseP.json();

                }

                navigation.goBack();
              }
              else {
                alert(json.mensagem);
              }
            }
            catch(e){
              alert('Erro ao salvar dados da agência');
            }
            finally{
              setShowLoader(false);
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
  cardUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '3%',
    width: '80%',
    borderStyle: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
  },
  listaOpcoes: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textoUsuario: {
      color: 'black',
      fontSize: 12,
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