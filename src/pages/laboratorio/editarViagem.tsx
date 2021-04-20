import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScrollViewFlat from '../../components/scrollViewFlat';
import CardParticipante from '../../components/cardParticipante';
import BotaoLupa from '../../components/botaoLupa';
import DatePicker from 'react-native-datepicker'

const moment = require('moment');

export default function EditarViagem({ route }) {
    const navigation = useNavigation();

    const [apelidoViagem, onChangeTextApelidoViagem] = useState(route.params.viagem.nome);
    const [dataInicio, onChangeTextDataInicio] = useState(route.params.viagem.dataInicio);
    const [dataFim, onChangeTextDataFim] = useState(route.params.viagem.dataFim);
    const [localViagem, onChangeTextLocalViagem] = useState(route.params.viagem.local);

    let participantesData = [
        {
            id: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
            nome: "Ednaldo Pereira",
            dono: true,
            proprietario: true
        },
        {
            id: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
            nome: "Edneia Silva",
            dono: false,
            proprietario: true
        },
    ];

    return (
        <ScrollViewFlat>
            <View style={styles.container}>
                <TextInput placeholder={"Apelido da viagem"} value={apelidoViagem} style={styles.input}
                    onChangeText={text => onChangeTextApelidoViagem(text)} />
                <View style={styles.containerData}>
                    <Text style={styles.labelData}>Data de Inicio</Text>
                    <Text style={styles.labelData}>Data de Fim</Text>
                </View>
                <View style={styles.containerData}>
                    <DatePicker
                        style={styles.inputDataCelular}
                        placeholder={"Data início"}
                        date={moment(dataInicio, 'DD/MM/YYYY')}
                        format="DD/MM/yyyy"
                        minDate="01/01/1900"
                        onDateChange={data => onChangeTextDataInicio(data)}
                    />
                    <DatePicker
                        style={styles.inputDataCelular}
                        placeholder={"Data fim"}
                        date={moment(dataFim, 'DD/MM/YYYY')}
                        format="DD/MM/yyyy"
                        minDate="01/01/1900"
                        onDateChange={data => onChangeTextDataFim(data)}
                    />
                </View>
                <TextInput placeholder={"Local da viagem"} value={localViagem} style={styles.input}
                    onChangeText={text => onChangeTextLocalViagem(text)} />
                    
                <TouchableOpacity style={styles.botaoCriar} onPress={() => {
                    alert('Clicou em criar viagem!')
                }}>
                    <Text style={styles.botaoCriarTexto}>Salvar viagem</Text>
                </TouchableOpacity>
            </View>
        </ScrollViewFlat>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    containerData: {
        flexDirection: 'row',
    },
    containerAddFuncionarios: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        marginTop: '3%',
        width: '95%',
        padding: 15,
        fontSize: 16,
        borderRadius: 41,
        backgroundColor: '#EBEBEB',
        color: '#333333',
    },
    inputData: {
        marginTop: '3%',
        marginHorizontal: '2%',
        padding: 15,
        fontSize: 16,
        borderRadius: 41,
        backgroundColor: '#EBEBEB',
        color: '#333333',
        width: '45%'
    },
    inputAddFuncionario: {
        marginTop: '3%',
        width: '85%',
        height: 'auto',
        padding: 15,
        fontSize: 16,
        borderRadius: 41,
        backgroundColor: '#EBEBEB',
        color: '#333333'
    },
    containerParticipantes: {
        borderStyle: 'dotted',
        borderColor: '#333333',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 10,
        width: '90%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    botaoCriar: {
        backgroundColor: '#3385FF',
        width: 180,
        height: 50,
        padding: 10,
        borderRadius: 40,
        marginTop: '5%',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    botaoCriarTexto: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 24
    },
    headerCardParticipante: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inputDataCelular: {
        marginTop: '1%',
        marginBottom: '3%',
        width: '45%',
        marginHorizontal: '2%',
        height: 50,
        backgroundColor: '#EBEBEB',
        textAlign: 'center',
        justifyContent: 'space-around',
        borderRadius: 32,
        padding: 15,
        fontSize: 16,
    },
    labelData: {
        marginTop: '3%',
        marginHorizontal: '2%',
        textAlign: 'center',
        fontSize: 18,
        color: '#999999',
        width: '45%'
    },
});