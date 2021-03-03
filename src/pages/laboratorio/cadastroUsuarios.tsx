import React from 'react';
import { Text, StyleSheet,TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

export default function CadastroUsuario() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarUsuario')}>
        <Image source={require('../../imgs/plus-circle.png')} />
      </TouchableOpacity>

      <DataTable>
        <DataTable.Header >
          <DataTable.Title>Nome</DataTable.Title>
          <DataTable.Title>E-mail</DataTable.Title>
          <DataTable.Title>Perfil</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row style={styles.corpoTabela}>
          <DataTable.Cell>Ednaldo Pereira</DataTable.Cell>
          <DataTable.Cell>ednaldo.pereira@gmail.com</DataTable.Cell>
          <DataTable.Cell>Proprietário</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.corpoTabela}>
          <DataTable.Cell>Ednaldo Agente</DataTable.Cell>
          <DataTable.Cell>ednaldo.agente@gmail.com</DataTable.Cell>
          <DataTable.Cell>Agente</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.corpoTabela}>
          <DataTable.Cell>Ednaldo Administrador</DataTable.Cell>
          <DataTable.Cell>ednaldo.adm@gmail.com</DataTable.Cell>
          <DataTable.Cell>Administrador</DataTable.Cell>
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
  cabecalhoTabela: {
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  corpoTabela: {
    backgroundColor: '#EBEBEB'
  }

})