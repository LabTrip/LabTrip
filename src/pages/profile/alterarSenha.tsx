import React from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function AlterarSenha() {
    return (
        <ScrollView
            contentContainerStyle={styles.container}>
            <TextInput placeholder='Senha atual' secureTextEntry={true} style={styles.input} />
            <TextInput placeholder='Nova senha' secureTextEntry={true} style={styles.input} />
            <TextInput placeholder='Confirme a nova senha' secureTextEntry={true} style={styles.input} />
            <TouchableOpacity style={styles.botaoSalvar} >
                <Text style={styles.botaoSalvarTexto}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
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