import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardAgente from '../../components/cardAgente'
import ScrollViewFlat from '../../components/scrollViewFlat';

export default function CriarAgencia() {
  const navigation = useNavigation();

  let participantesData = [
    {
      id: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      nome: "Ednaldo Pereira"
    },
    {
      id: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
      nome: "Ednaldo Pereiro"
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollViewFlat>
        <View style={{alignItems: 'center'}}>
          <TextInput placeholder={"Nome"} style={styles.input} />
          <TextInput placeholder={"Adicionar Funcionarios"} style={styles.input} />

          <View style={styles.containerFuncionarios}>
            <FlatList
              data={participantesData}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => (
                <CardAgente nome={item.nome} />
              )}
            />
          </View>

          <TouchableOpacity style={styles.botaoSalvar} onPress={() => {
            alert('Clicou em criar agencia!')
            navigation.goBack();
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