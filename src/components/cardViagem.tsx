import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CardViagem(props) {
    let corDoCard, corBordaDoCard;
    const navigation = useNavigation();

    switch (props.status) {
        case "Em andamento":
            corDoCard = '#CCEEFF';
            corBordaDoCard = '#00AEFF';
            break;
        case "Concluida":
            corDoCard = '#CEF7E3';
            corBordaDoCard = '#0FD06F';
            break;
        case "Agendada":
            corDoCard = '#FFFDD1';
            corBordaDoCard = '#F8EC12';
            break;
        case 'Cancelada':
            corDoCard = '#F0F0F0';
            corBordaDoCard = '#787878';
            break;
        default:
            corDoCard = '#F0F0F0';
            corBordaDoCard= '#787878';
            break;
    }

    return (
        <TouchableOpacity style={[styles.cardViagens, 
        { backgroundColor: corDoCard, borderLeftColor: corBordaDoCard }]} 
        onPress={() => navigation.navigate(props.navigate, {item: props.item})}>
            <Text>{props.nome}</Text>
            <Text>Início: {props.dataInicio}, Fim: {props.dataFim}</Text>
            <Text>Local: {props.local}</Text>
            <Text>Status: {props.status}</Text>
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

