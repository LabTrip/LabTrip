import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ConvidarParticipantes() {
    return (
        <View style={styles.container}>
            <TextInput placeholder='Email do convidado' autoCapitalize={'none'}
            autoCompleteType={'email'} style={styles.input} />
            <TouchableOpacity style={styles.botaoSalvar}>
                <Text style={styles.botaoSalvarTexto}>Convidar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    }, input: {
        marginTop: '10%',
        width: '90%',
        padding: 15,
        fontSize: 16,
        borderRadius: 41,
        backgroundColor: '#EBEBEB',
        color: '#333333',
        textAlign: 'center'
    },
    botaoSalvar: {
        backgroundColor: '#3385FF',
        width: 144,
        height: 50,
        padding: 10,
        borderRadius: 40,
        marginTop: 30,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
    },
    botaoSalvarTexto: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 24,
    },
})