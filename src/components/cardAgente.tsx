import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Switch, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CardAgente(props) {
    const icon = 'close-thick', color = 'red';
    return (
        <View style={styles.cardParticipante}>
            <Image source={require('../imgs/perfil.png')} style={styles.fotoPerfil} />
            <View style={styles.headerCardParticipante}>
                <Text style={styles.textoParticipante}> {props.nome}</Text>
            </View>

            <TouchableOpacity >
                <MaterialCommunityIcons name={icon} color={color} size={30} />
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    cardParticipante: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '3%',
        width: '95%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 26,
        marginTop: '3%',
        marginBottom: '3%',
    },
    textoParticipante: {
        color: 'black',
        fontSize: 18,
        width: '60%',
        maxWidth: '60%',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    headerCardParticipante: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    fotoPerfil: {
        borderRadius: 50,
        width: 60,
        height: 60
    }
});