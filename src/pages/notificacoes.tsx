import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BarraNotificacao from '../components/barraNotificacao';

export default function Notificacoes() {
  return (
    <ScrollView>
      <BarraNotificacao  icone="airplane" texto="Uma nova viagem vinculada a você foi criada." corDaBarra="#EBFAFF"  />
      <BarraNotificacao  icone="weather-pouring" texto="Condições climáticas instáveis para sua próxima atividade às 15:00." corDaBarra="#FFFFFF"  />
    </ScrollView>
  );
}