import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import normalize from './fontSizeResponsive';

let corDoCard, corBordaDoCard, status, corDoStatus;

export default function CardRoteiro(props) {

    const navigation = useNavigation();

    switch (props.status) {
        case 1:
            corDoCard = '#FFFDD1';
            corBordaDoCard = '#F8EC12';
            status = "Em Planejamento";
            corDoStatus = '#B7AF0B'
            break;
        case 6:
            corDoCard = '#CEF7E3';
            corBordaDoCard = '#0FD06F';
            status = "Aprovado";
            corDoStatus = '#0FD06F';
            break;
        case 7:
            corDoCard = '#FFCCCC';
            corBordaDoCard = '#FF0000';
            status = "Reprovado";
            corDoStatus = '#D12323'
            break;
        default:
            corDoCard = '#F0F0F0';
            corBordaDoCard = '#787878';
            status = "Não definido"
            corDoStatus = '#333333';
            break;
    }

    return (
        <TouchableOpacity style={[styles.cardViagens,
        { backgroundColor: corDoCard, borderLeftColor: corBordaDoCard }]}
            onPress={() => navigation.navigate(props.navigate, { viagem: props.item })}>
            <Text>{props.nome}</Text>
            <Text>
                <Text style={styles.label}>Início:</Text> {props.dataInicio}
                <Text style={styles.label}> Fim:</Text> {props.dataFim}
            </Text>
            <Text>
                <Text style={styles.label}>Status: </Text>
                <Text style={{ color: corDoStatus }}>{status}</Text>
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardViagens: {
        marginTop: 25,
        padding: 10,
        borderRadius: 13,
        borderLeftWidth: 6,
        width: '100%',
        height: 143,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold'
    }
});

