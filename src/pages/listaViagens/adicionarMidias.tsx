import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function AdicionarMidias() {
    return (
        <View style={styles.conteudo}>
            <Text>Tela para adicionar e excluir midias</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
