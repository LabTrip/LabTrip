import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CadastroAgencia() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarAgencia')}>
        <Image source={require('../../imgs/plus-circle.png')} />
      </TouchableOpacity>
      <Text>cadastro de agencias</Text>
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
  }
})