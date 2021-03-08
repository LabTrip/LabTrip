import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker'

const moment = require('moment');


export default function EditarPerfil() {
    const [nome, onChangeTextNome] = useState("");
    const [email, onChangeTextEmail] = useState("");
    const [data, onChangeTextData] = useState("");
    const [telefone, onChangeTextTelefone] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [tokenUsuario, setTokenUsuario] = useState("");

    const navigation = useNavigation();

    let token, userId;

    const getUsuario = async () => {
        return await fetch('https://labtrip-backend.herokuapp.com/usuarios/' + userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
    }

    const editaUsuario = async () => {
        return await fetch('https://labtrip-backend.herokuapp.com/usuarios/' + idUsuario, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenUsuario
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                telefone: telefone,
                dataNascimento: moment(data, "DD/MM/YYYY").format("YYYY-MM-DD")
            })
        });
    }

    const buscaPreencheUsuario = async () => {
        try {
            const value = await AsyncStorage.getItem('AUTH');
            const user = await AsyncStorage.getItem('USER_ID');
            if (value !== null) {
                token = JSON.parse(value)
            }
            if (user !== null) {
                
                userId = JSON.parse(user)
            }
            console.log(user)
            const response = await getUsuario();
            const json = await response.json();
            if (response.status == 200) {
                onChangeTextNome(json.nome);
                onChangeTextEmail(json.email);
                onChangeTextData(moment(json.dataNascimento).format('DD-MM-yyyy'));
                onChangeTextTelefone(json.telefone);
            }
        }
        catch (e) {
            alert(e)
        }
    }

    const storeData = async (value, key) => {
        try {
          await AsyncStorage.setItem(key, value)
          return "ok";
        } catch (e) {
          // saving error
          return e
        }
      }

    useEffect(() => {
        const request = async () => {
            try {
                const value = await AsyncStorage.getItem('AUTH');
                const user = await AsyncStorage.getItem('USER_ID');
                if (value !== null) {
                    token = JSON.parse(value)
                    setTokenUsuario(JSON.parse(value))
                }
                if (user !== null) {
                    userId = JSON.parse(user)
                    setIdUsuario(JSON.parse(user))
                }
                console.log(userId)
                const response = await getUsuario();
                const json = await response.json();
                if (response.status == 200) {
                    onChangeTextNome(json.nome);
                    onChangeTextEmail(json.email);
                    onChangeTextData(moment(json.dataNascimento).format('DD/MM/yyyy'));
                    onChangeTextTelefone(json.telefone);
                }
            }
            catch (e) {
                alert(e)
            }
        }

        request()

    }, [])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        buscaPreencheUsuario();
        setRefreshing(false);
    }, []);

    const confirmaLogout = async () => {
        Alert.alert(
            'Encerrar sessão',
            'Deseja mesmo sair de sua conta?',
            [
                {
                    text: 'sim',
                    onPress: async () => {
                        const responseAuth = await storeData('', 'AUTH')
                        const responseUserId = await storeData('', 'USER_ID')
                        if(responseAuth == 'ok' && responseUserId == 'ok'){
                            navigation.dispatch(
                                StackActions.replace('Login', {
                                })
                            )
                        }
                    }
                },
                {
                    text: 'não',
                    onPress: () => {

                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.conteudo}>
                    <TouchableOpacity>
                        <Image source={require('../../imgs/perfil.png')} style={styles.fotoPerfil} />
                    </TouchableOpacity>
                    <TextInput placeholder={"Nome"} value={nome} style={styles.input}
                        onChangeText={text => onChangeTextNome(text)} />
                    <TextInput placeholder={"Email"} value={email} style={styles.input}
                        onChangeText={text => onChangeTextEmail(text)} />
                    <DatePicker 
                        placeholder={"Data Nascimento"}  style={styles.inputDataCelular}
                        date={data}
                        format="DD/MM/yyyy"
                        minDate="01/01/1900"
                        onDateChange={data => onChangeTextData(data)}
                    /> 
                    <TextInput placeholder={"Telefone"} value={telefone} style={styles.input}
                        onChangeText={text => onChangeTextTelefone(text)} />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AlterarSenha', {userId: idUsuario, token: tokenUsuario })
                        }
                    }>
                        <Text style={styles.link}>
                            Alterar senha
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoSalvar} onPress={async () => {
                        let response = await editaUsuario();
                        if(response.status == 200){
                            alert('Dados alterados com sucesso.')
                        }
                        console.log(moment(data, "DD/MM/YYYY").format("YYYY-MM-DD"))
                    }}>
                        <Text style={styles.botaoSalvarTexto}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoSair} onPress={async () => {

                        await confirmaLogout();
                        
                    }} >
                        <Text style={styles.botaoSalvarTexto}>Sair da conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    conteudo: {
        alignItems: 'center',
    },
    fotoPerfil: {
        width: 150,
        height: 150,
        marginTop: 20,
        borderRadius: 82,
    },
    input: {
        marginTop: 25,
        width: 266,
        height: 50,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 32,
        borderColor: 'black',
        borderWidth: 1
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
    botaoSair: {
        backgroundColor: '#FB0105',
        flex: 1,
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
    link: {
        marginTop: 30,
        textDecorationLine: 'underline',
        fontSize: 20,
    },
    containerDataCelular: {
      flexDirection: 'row',
    },
    inputDataCelular: {
        marginTop: 25,
        width: 266,
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