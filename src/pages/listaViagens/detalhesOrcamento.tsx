import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BotaoMais from '../../components/botaoMais';
import CardOrcamento from '../../components/cardOrcamento';
import CardDespesasAdicionais from '../../components/cardDespesaAdicional';


export default function DetalhesOrcamento() {
    return (
        <View style={styles.container}>
            <BotaoMais />
            <CardOrcamento planejado={30000} saldoAtual={10000} />

            <Text style={styles.label}>Despesas adicionais: </Text>
            <CardDespesasAdicionais data={'12/03/2021'} descricao={'Dogão na praça'} valor={458}/>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        textAlign: 'left',
    },
    label: {
        fontSize: 18,
        color: '#999999',
        marginTop: '5%',
        marginBottom: '1%',
    },
    cardOrcamento: {
        height: 100,
        width: '90%',
        backgroundColor: '#F2F2F2',
        borderRadius: 7,
    }
})
