import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CardOrcamento(props) {
    return (
        <View style={styles.cardOrcamento}>
            <View style={styles.containerRow}>
                <Text style={styles.texto}>Orçamento planejado: R$ {props.planejado}</Text>
                <TouchableOpacity >
                    <MaterialCommunityIcons name={'pencil'} color={'black'} size={25} />
                </TouchableOpacity>
            </View>
            <View>
            </View>
            <View style={styles.containerRow}>
                <Text style={styles.texto}>Saldo atual: R$ {props.saldoAtual}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        color: '#999999',
    },
    cardOrcamento: {
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
