import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CadastroAgencia() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('CriarAgencia')}>
        <Image source={require('../../imgs/plus-circle.png')} />
      </TouchableOpacity>
      <Text>cadastro de agencias</Text>
    </View>
  );
}