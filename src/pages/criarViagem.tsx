import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Cabecalho from '../components/cabecalho'
import MenuBar from '../components/menu'

export default function CriarViagem() {
    const navigation = useNavigation();

  return (
    
    <View style={{ width: '100%', height: '100%', backgroundColor: '#fff'}} >
        <Cabecalho></Cabecalho>
        <Text>Criar viagem</Text>
        
        <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.navigate('MenuBar')}>
                        <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    botaoCancelar: {
        backgroundColor: 'red',
        width: 144,
        height: 50,
        padding: 10,
        borderRadius: 40,
        marginTop: 30,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    botaoCancelarTexto: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 24
    }

});