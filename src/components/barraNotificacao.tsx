import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BarraNotificacao(props) {
    return (
        <TouchableOpacity>
            <View style={{backgroundColor: props.corDaBarra}}>
                <View style={styles.barraNotificacao} >
                    <View style={styles.icone}>
                        <MaterialCommunityIcons name={props.icone} color={'#000000'} size={24} />
                    </View>
                    <Text style={styles.textoNotificacao}>{props.texto}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    barraNotificacao: {
        fontSize: 50,
        borderColor: '#BABABA',
        borderWidth: 0.7,
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