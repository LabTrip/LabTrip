import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker'

const moment = require('moment');

export default function EditarDespesaAdicional({ route }) {
    const [data, setData] = useState(route.params.data);
    const [descricao, setDescricao] = useState(route.params.descricao)
    const [valor, setValor] = useState(route.params.valor.toString())

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TextInput placeholder='Descrição' style={styles.input}
                value={descricao} onChangeText={(texto) => setDescricao(texto)} />
            <TextInput placeholder='Valor da despesa' style={styles.input}
                keyboardType={'decimal-pad'} value={valor} onChangeText={(valor) => setValor(valor)} />
            <DatePicker
                style={styles.input}
                placeholder={"Data início"}
                date={moment(data, 'DD/MM/YYYY')}
                format="DD/MM/yyyy"
                minDate="01/01/1900"
                onDateChange={data => setData(data)}
            />

            <View style={styles.containerBotoes}>
                <TouchableOpacity style={styles.botaoSalvar} onPress={() => {

                }}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoBotao}>Cancelar</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    label: {
        fontSize: 18,
        color: '#999999',
        textAlign: 'center',
        marginTop: '10%'
    },
    texto: {
        width: '80%',
        flexWrap: 'wrap',
        marginTop: '3%',
        textAlign: 'center'
    },
    input: {
        marginTop: '5%',
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
        width: '35%',
        padding: 10,
        borderRadius: 40,
        marginTop: '5%',
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%'
    },
    botaoCancelar: {
        backgroundColor: '#FF3333',
        width: '35%',
        padding: 10,
        borderRadius: 40,
        marginTop: '5%',
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%'
    },
    textoBotao: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'

    }
})