import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

export default function LinhaTabelaAgencia(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.navigate, { agencia: props.item })}>
      <DataTable.Row style={styles.corpoTabela}>
        <DataTable.Cell>{props.nome}</DataTable.Cell>
        <DataTable.Cell>Ativo</DataTable.Cell>
      </DataTable.Row>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  corpoTabela: {
    backgroundColor: '#EBEBEB'
  }
})
