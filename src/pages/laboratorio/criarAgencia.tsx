import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardParticipante from '../../components/cardParticipante';
import CardAgencia from '../../components/cardAgente'

export default function CriarAgencia() {
  const navigation = useNavigation();

  function VirtualizedView(props: any) {
    return (
      <FlatList
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => "dummy"}
        renderItem={null}
        ListHeaderComponent={() => (
          <React.Fragment>{props.children}</React.Fragment>
        )}
      />
    );
  }

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
    <VirtualizedView style={styles.container}> 
      <View style={styles.container}>
        <TextInput placeholder={"Nome"} style={styles.input} />
        <TextInput placeholder={"Adicionar Participantes"} style={styles.input} />

        <View style={styles.containerParticipantes}>
          <FlatList
            data={participantesData}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <CardAgencia nome={item.nome} />
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
    </VirtualizedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%'
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
  containerParticipantes: {
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
  headerCardParticipante: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
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