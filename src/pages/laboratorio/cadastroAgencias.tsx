import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Agencia {
  id: string,
  nome: string
}

export default function CadastroAgencia() {
  const navigation = useNavigation();
  const [agencias, setAgencias] = useState<Agencia[]>();
  const [refreshing, setRefreshing] = useState(false);
  let token;

  const getAgencias = async () => {
    return await fetch('https://labtrip-backend.herokuapp.com/agencias', {
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
        if (value != null) {
          token = JSON.parse(value)
          const response = await getAgencias();
          const json = await response.json();
          if (response.status == 200) {
            setAgencias(json);
          }
        }
      }
      catch (e) {
        alert(e)
      }
    }
    request()
  }, []);

  const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      setRefreshing(false)
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarAgencia')}>
        <Image source={require('../../imgs/plus-circle.png')} />
      </TouchableOpacity>

      <DataTable>
        <DataTable.Header style={styles.cabecalhoTabela}>
          <DataTable.Title>
            <Text style={styles.textoCabecalho}>Agência</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.textoCabecalho}>Status</Text>
          </DataTable.Title>
        </DataTable.Header>

        {
          agencias?.map((a) => {
            return <TouchableOpacity key={a.id}>
              <DataTable.Row style={styles.corpoTabela}>
                <DataTable.Cell>{a.nome}</DataTable.Cell>
                <DataTable.Cell>Ativo</DataTable.Cell>
              </DataTable.Row>
            </TouchableOpacity>
          })
        }

      </DataTable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  botaoMais: {
    margin: 20
  },
  cabecalhoTabela: {
    backgroundColor: 'black',
  },
  textoCabecalho: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  corpoTabela: {
    backgroundColor: '#EBEBEB'
  }
})