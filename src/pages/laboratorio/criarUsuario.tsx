import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function CriarUsuario() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={styles.container}>
      <TextInput placeholder={"Nome"} style={styles.input} />
      <TextInput placeholder={"E-mail"} style={styles.input} />

      <View style={styles.containerDataCelular}>
        <TextInput placeholder={"Data Nascimento"} style={styles.inputDataCelular} />
        <TextInput placeholder={"Celular"} style={styles.inputDataCelular} />
      </View>
    <Text style={styles.label}>Tipo de usuário:</Text>
      <Picker style={styles.pickerComponente}
        prompt="Tipo de usuário"
        mode="dropdown"
        
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue)
        }}>

        <Picker.Item label="Gerente" value="gerente" />
        <Picker.Item label="Agente" value="agente" />
        <Picker.Item label="Viajante" value="viajante" />
      </Picker>

      <TouchableOpacity style={styles.botaoCadastrar} onPress={() => {
        alert('Clicou em criar usuario!')
        navigation.goBack();
      }}>
        <Text style={styles.botaoCadastrarTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
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
  containerDataCelular: {
    flexDirection: 'row',
  },
  inputDataCelular: {
    marginTop: '3%',
    marginHorizontal: '2%',
    padding: 15,
    fontSize: 16,
    borderRadius: 41,
    backgroundColor: '#EBEBEB',
    color: '#333333',
    width: '45%'
  },
  pickerComponente: {
    marginTop: '3%',
    width: '95%',
    padding: 15,
    fontSize: 16,
    borderRadius: 41,
    backgroundColor: '#EBEBEB',
    color: '#333333'
  },
  label:{
    fontSize: 16,
    color: '#333333',
    marginTop: '3%'
  },
  botaoCadastrar: {
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
  botaoCadastrarTexto: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 24
  }
});