import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

export default function CadastroAgencia() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarAgencia')}>
        <Image source={require('../../imgs/plus-circle.png')} />
      </TouchableOpacity>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Agência</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row style={styles.corpoTabela}>
          <DataTable.Cell>Azurro Travel</DataTable.Cell>
          <DataTable.Cell>Ativo</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.corpoTabela}>
          <DataTable.Cell>Tereza Pérez</DataTable.Cell>
          <DataTable.Cell>Inativo</DataTable.Cell>
        </DataTable.Row>

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
  corpoTabela: {
    backgroundColor: '#EBEBEB'
  }
})