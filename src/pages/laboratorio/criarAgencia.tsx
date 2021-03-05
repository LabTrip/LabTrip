import React, { useEffect } from 'react';
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

export default function CriarAgencia() {
  const navigation = useNavigation();
  let token;
  let nomeAgencia;
  function onChangeTextnomeAgencia(text) {
    nomeAgencia = text;
  }
  let email;
  function onChangeTextEmail(text) {
    email = text;
  }
  const [idAgencia, setIdAgencia] = React.useState('');
  const [participantes, setParticipantes] = React.useState<Usuario[]>([]);
  const criaAgencia = async (corpo) => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias', {
      method: 'POST',
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

    setParticipantes(participantesAux.splice(index, 1));
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
    return await fetch('https://labtrip-backend.herokuapp.com/agencias/convida-funcionarios/' + idAgencia, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(corpo)
    });
  }

  let participantesData = [
    {
      id: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      nome: "Ednaldo Pereira"
    },
    {
      id: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
      nome: "Ednaldo Pereiro"
    },
    
    
  ];

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
                if(reponseUsuario.status >= 200 && reponseUsuario.status <= 299){
                  //console.log(jsonUsuario)
                  adicionaParticipanteArray(jsonUsuario);
                  //console.log(participantes)
                }
                else{
                  //console.log(jsonUsuario)
                  alert("Erro ao buscar usuário.")
                }
              
            }} />
          </View>
          <View style={styles.containerFuncionarios}>
            <FlatList
              data={participantes}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => (
                <CardAgente nome={item.nome} onPress={() => alert('teste')} />
              )}
            />
          </View>

          <TouchableOpacity style={styles.botaoSalvar} onPress={async () => {
            let response = await criaAgencia({ nome: nomeAgencia });
            let json = await response.json();
            if (response.status >= 200 && response.status <= 299) {
              alert('Agencia criada com sucesso!')
              setIdAgencia(json.id)
              if(participantes.length > 0){
                let responseP = await convidaFuncionarios(participantes);
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
            <Text style={styles.botaoSalvarTexto}>Criar viagem</Text>
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