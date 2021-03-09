import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import TabelaCadastroUsuario from '../../components/tabelaCadastroUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinhaTabelaUsuario from '../../components/linhaTabelaUsuario';

interface Usuario {
  id: string,
  nome: string,
  email: string,
  descricao: string,
}

export default function CadastroUsuario() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState<Usuario[]>();
  const [refreshing, setRefreshing] = useState(false);
  let token;

  const getUsuarios = async () => {
    return await fetch('https://labtrip-backend.herokuapp.com/usuarios/', {
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
          const response = await getUsuarios();
          const json = await response.json();
          if (response.status == 200) {
            setUsuarios(json);
          }
        }
      }
      catch (e) {
        alert(e)
      }
    }
    request()
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [refreshing]);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarUsuario')}>
        <Image source={require('../../imgs/plus-circle.png')} />
      </TouchableOpacity>

      <DataTable style={{ flex: 1 }}>
        <DataTable.Header style={styles.cabecalhoTabela}>
          <DataTable.Title>
            <Text style={styles.textoCabecalho}>Nome</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.textoCabecalho}>E-mail</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.textoCabecalho}>Perfil</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {
            usuarios?.map((a) => {
              return <LinhaTabelaUsuario key={a.id} nome={a.nome} email={a.email} descricao={a.descricao} navigate={"EditarUsuario"} item={a} />
            })
          }
        </ScrollView>
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