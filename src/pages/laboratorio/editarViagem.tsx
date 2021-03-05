import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScrollViewFlat from '../../components/scrollViewFlat';
import CardParticipante from '../../components/cardParticipante';
import BotaoLupa from '../../components/botaoLupa';

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
            nome: "Ednaldo Pereiro",
            dono: false,
            proprietario: true
        },
        {
            id: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
            nome: "Ednalda Pereira",
            dono: false,
            proprietario: false
        },
    ];

    return (
        <ScrollViewFlat>
            <View style={styles.container}>
                <TextInput placeholder={"Apelido da viagem"} value={apelidoViagem} style={styles.input}
                    onChangeText={text => onChangeTextApelidoViagem(text)} />
                <View style={styles.containerData}>
                    <TextInput placeholder={"Data início"} value={dataInicio} style={styles.inputData}
                        onChangeText={text => onChangeTextDataInicio(text)} />
                    <TextInput placeholder={"Data fim"} value={dataFim} style={styles.inputData}
                        onChangeText={text => onChangeTextDataFim(text)} />
                </View>
                <TextInput placeholder={"Local da viagem"} value={localViagem} style={styles.input}
                    onChangeText={text => onChangeTextLocalViagem(text)} />

                <View style={styles.containerAddFuncionarios}>
                    <TextInput placeholder={"Adicionar Funcionarios"} style={styles.inputAddFuncionario} />
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
});