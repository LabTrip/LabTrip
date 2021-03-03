import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TabelaCadastroUsuario(props) {
  return (
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
          <DataTable.Cell>{props.nome}</DataTable.Cell>
          <DataTable.Cell>{props.email}</DataTable.Cell>
          <DataTable.Cell>{props.perfil}</DataTable.Cell>
        </DataTable.Row>
      </TouchableOpacity>
    </DataTable>
  )
}

const styles = StyleSheet.create({
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