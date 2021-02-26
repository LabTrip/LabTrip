import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CardRoteiro(props) {
    return (
        <TouchableOpacity style={styles.cardRoteiro}>
            <Text style={styles.textoTitulo}>{props.nome} </Text>
            <View style={styles.detalhes}>
                <Text style={styles.textoDetalhes}>Local: {props.local}{"\n"}Horário: {props.horario}</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="check-bold" color={'#0FD06F'} size={29} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="close-thick" color={'#FF2424'} size={29} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardRoteiro: {
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        marginTop: '3%',
    },
    textoTitulo: {
        fontSize: 18,
        color: '#999999',

        marginLeft: 15,
    },
    textoDetalhes: {
        fontSize: 16,
        color: '#999999',
        marginLeft: 15,
        width: '65%',
        flexWrap: 'wrap',
    },
    detalhes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});