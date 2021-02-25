import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CardRoteiro(props) {
    return (
        <TouchableOpacity style={styles.cardRoteiro}>
            <Text style={styles.textoTitulo}>{props.nome} </Text>
            <View style={styles.detalhes}>
                <Text style={styles.textoDetalhes}>Local: {props.local}  Horário: {props.horario}</Text>
                <View style={styles.icones} >
                    <TouchableOpacity style={styles.icone}>
                        <MaterialCommunityIcons name="check-bold" color={'#0FD06F'} size={29} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icone}>
                        <MaterialCommunityIcons name="close-thick" color={'#FF2424'} size={29} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardRoteiro: {
        backgroundColor: '#F2F2F2',
        height: 63,
        marginLeft: '3%',
        marginRight: '3%',
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
    },
    detalhes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icone: {
        marginLeft: '5%',
        marginRight: '5%',
    },
    icones: {
        flexDirection: 'row',
    }
});