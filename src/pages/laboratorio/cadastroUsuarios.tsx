import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import TabelaCadastroUsuario from '../../components/tabelaCadastroUsuario';


export default function CadastroUsuario() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarUsuario')}>
        <Image source={require('../../imgs/plus-circle.png')} />
      </TouchableOpacity>

      <DataTable>
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

        <TouchableOpacity>
          <DataTable.Row style={styles.corpoTabela}>
            <DataTable.Cell>Ednaldo Pereira</DataTable.Cell>
            <DataTable.Cell>ednaldo.pereira@gmail.com</DataTable.Cell>
            <DataTable.Cell>Proprietário</DataTable.Cell>
          </DataTable.Row>
        </TouchableOpacity>

        <TouchableOpacity>
          <DataTable.Row style={styles.corpoTabela}>
            <DataTable.Cell>Ednaldo Agente</DataTable.Cell>
            <DataTable.Cell>ednaldo.agente@gmail.com</DataTable.Cell>
            <DataTable.Cell>Agente</DataTable.Cell>
          </DataTable.Row>
        </TouchableOpacity>

        <TouchableOpacity>
          <DataTable.Row style={styles.corpoTabela}>
            <DataTable.Cell>Ednaldo Administrador</DataTable.Cell>
            <DataTable.Cell>ednaldo.adm@gmail.com</DataTable.Cell>
            <DataTable.Cell>Administrador</DataTable.Cell>
          </DataTable.Row>
        </TouchableOpacity>
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