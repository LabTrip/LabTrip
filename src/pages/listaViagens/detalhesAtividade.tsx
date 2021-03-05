import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function DetalhesAtividade(props) {
    return (
        <View style={styles.container}>
            <View style={styles.containerDetalhes}>
                <Text style={styles.tituloDetalhes}>Visita ao louvre</Text>
                <View style={styles.containerDataStatus}>
                    <Text style={styles.textoDetalhes}>13/08/2020</Text>
                    <Text style={styles.textoStatus}>Agendada</Text>
                </View>
                <Text style={styles.textoDetalhes}>13:00</Text>
                <Text style={styles.textoDetalhes}>Rua do rivotril, 666</Text>
                <Text style={styles.textoDetalhes}>Ensolarado, 25°</Text>
            </View>
            <Text style={styles.tituloDetalhes}>Custo R$ 500,00</Text>

            <View style={[styles.containerDetalhes, {height: '40%'}]}>
                <Text style={styles.tituloDetalhes}>Midias</Text>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    containerDetalhes: {
        marginTop: '3%',
        marginBottom: '3%',
        backgroundColor: '#F2F2F2',
        width: '96%',
    },
    containerDataStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textoStatus: {
        color: '#0FD06F',
        marginRight: '5%',
        fontSize: 15,
    },
    textoDetalhes: {
        marginLeft: '5%',
        color: '#999999',
        marginBottom: '3%',
        fontSize: 15,
        maxWidth: '90%',
        flexWrap: 'wrap'
    },
    tituloDetalhes: {
        textAlign: 'center',
        color: '#999999',
        fontSize: 24,
    }
})