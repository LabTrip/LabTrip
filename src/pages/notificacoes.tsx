import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BarraNotificacao from '../components/barraNotificacao';

export default function Notificacoes() {
  return (
    <ScrollView>
      <BarraNotificacao  icone="airplane" texto="Uma nova viagem vinculada a você foi criada." corDaBarra="#EBFAFF"  />
      <BarraNotificacao  icone="weather-pouring" texto="Condições climáticas instáveis para sua próxima atividade às 15:00." corDaBarra="#FFFFFF"  />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  barraNotificacao: {
    fontSize: 50,
    borderColor: '#BABABA',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 71,
    textAlign: 'center',
    
  },
  textoNotificacao: {
    fontSize: 14,
    flex: 1
  },
  icone: {
    marginLeft: 20,
    width: '10%',
  }
});