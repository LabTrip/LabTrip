import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();



export default function CriarAgencia() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Teste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 
  input: {
    marginRight: 25,
    width: 266,
    height: 30,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 32,
  }
});
