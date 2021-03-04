import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CardViagem(props) {
    let corDoCard, corBordaDoCard, status;
    const navigation = useNavigation();

    switch (props.status) {
        case 1:
            corDoCard = '#FFFDD1';
            corBordaDoCard = '#F8EC12';
            status = "Em Planejamento";
            break;
        case 2:
            corDoCard = '#FFFDD1';
            corBordaDoCard = '#F8EC12';
            status = "Planejado";
            break;
        case 3:
            corDoCard = '#CCEEFF';
            corBordaDoCard = '#00AEFF';
            status = "Em andamento";
            break;
        case 5:
            corDoCard = '#CEF7E3';
            corBordaDoCard = '#0FD06F';
            status = "Concluído";
            break;
        default:
            corDoCard = '#F0F0F0';
            corBordaDoCard = '#787878';
            status = "Cancelado"
            break;
    }

    return (
        <TouchableOpacity style={[styles.cardViagens,
        { backgroundColor: corDoCard, borderLeftColor: corBordaDoCard }]}
            onPress={() => navigation.navigate(props.navigate, {viagem: props.item})}>
            <Text>{props.nome}</Text>
            <Text>Início: {props.dataInicio}, Fim: {props.dataFim}</Text>
            <Text>Local: {props.local}</Text>
            <Text>Status: {status}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardViagens: {
        marginTop: 25,
        padding: 10,
        borderRadius: 13,
        borderLeftWidth: 6,
        width: '85%',
        height: 143,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

