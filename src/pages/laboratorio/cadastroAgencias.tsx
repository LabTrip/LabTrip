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
        <DataTable.Header style={styles.cabecalhoTabela}>
          <DataTable.Title>
            <Text style={styles.textoCabecalho}>Agência</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.textoCabecalho}>Status</Text>
          </DataTable.Title>
        </DataTable.Header>

        <TouchableOpacity>
          <DataTable.Row style={styles.corpoTabela}>
            <DataTable.Cell>Azurro Travel</DataTable.Cell>
            <DataTable.Cell>Ativo</DataTable.Cell>
          </DataTable.Row>
        </TouchableOpacity>

        <TouchableOpacity>
          <DataTable.Row style={styles.corpoTabela}>
            <DataTable.Cell>Tereza Pérez</DataTable.Cell>
            <DataTable.Cell>Inativo</DataTable.Cell>
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