import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

export default function LinhaTabelaAgencia(props) {
    let agencia;
    const navigation = useNavigation();

    return (
        <TouchableOpacity >
            <DataTable.Row style={styles.corpoTabela}>
            <DataTable.Cell>{props.nome}</DataTable.Cell>
            <DataTable.Cell>Ativo</DataTable.Cell>
            </DataTable.Row>
        </TouchableOpacity>
    )
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
