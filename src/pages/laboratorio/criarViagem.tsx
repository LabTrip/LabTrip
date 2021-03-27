import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardParticipante from '../../components/cardParticipante';
import ScrollViewFlat from '../../components/scrollViewFlat';
import BotaoLupa from '../../components/botaoLupa';
import DatePicker from 'react-native-datepicker'

const moment = require('moment');


export default function CriarViagem() {
    const navigation = useNavigation();
    const [dataInicio, onChangeTextDataInicio] = useState(moment());
    const [dataFim, onChangeTextDataFim] = useState(moment());

    let participantesData = [
        {
            id: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
            nome: "Ednaldo Pereira",
            dono: true,
            proprietario: true
        },
    ];

    return (
        <ScrollViewFlat>
            <View style={styles.container}>
                <TextInput placeholder={"Apelido da viagem"} style={styles.input} />
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
                <TextInput placeholder={"Local da viagem"} style={styles.input} />
                <View style={styles.containerAddFuncionarios}>
                    <TextInput placeholder={"Adicionar Dono"} style={styles.inputAddFuncionario} />
                    <BotaoLupa onPress={() => alert('clicou para adicionar')} />
                </View>
                <View style={styles.containerAddFuncionarios}>
                    <TextInput placeholder={"Adicionar Participantes"} style={styles.inputAddFuncionario} />
                    <BotaoLupa onPress={() => alert('clicou para adicionar')} />
                </View>
                <View style={styles.containerParticipantes}>
                    <FlatList
                        data={participantesData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CardParticipante nome={item.nome} dono={item.dono} proprietario={item.proprietario} />
                        )}

                    />
                </View>

                <TouchableOpacity style={styles.botaoCriar} onPress={() => {
                    alert('Clicou em criar viagem!')
                    navigation.goBack();
                }}>
                    <Text style={styles.botaoCriarTexto}>Criar viagem</Text>
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
    labelData: {
        marginTop: '3%',
        marginHorizontal: '2%',
        textAlign: 'center',
        fontSize: 18,
        color: '#999999',
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
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'space-around',
        fontWeight: 'bold',
        borderRadius: 32,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
    }

});
