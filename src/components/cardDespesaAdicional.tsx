import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CardDespesaAdicional(props) {
    return (
        <View style={styles.cardDespesaAdicional}>
            <View style={styles.containerRow}>
                <Text style={styles.texto}>{props.data}</Text>
                <TouchableOpacity >
                    <MaterialCommunityIcons name={'pencil'} color={'black'} size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerRow}>
                <Text style={styles.texto}>{props.descricao}</Text>
            </View>
            <View style={styles.containerRow}>
                <Text style={styles.texto}>Valor: R$ {props.valor}</Text>
                <TouchableOpacity >
                    <MaterialCommunityIcons name={'close-thick'} color={'black'} size={25} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    cardDespesaAdicional: {
        width: '90%',
        backgroundColor: '#F2F2F2',
        borderRadius: 7,
        flexDirection: 'column',
        padding: '2%'
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '2%',
        marginRight: '2%',
    },
    texto: {
        fontSize: 18,
        color: '#999999',
        flexWrap: 'wrap',
        width: '90%'
    },
})
