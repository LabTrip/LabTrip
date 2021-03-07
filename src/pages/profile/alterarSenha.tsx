import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function AlterarSenha() {

const [idUser, setIdUser] = React.useState(null);
const [senhaAntiga, setSenhaAntiga] = React.useState(null);
const [novaSenha, setNovaSenha] = React.useState(null);
const [confNovaSenha, setConfNovaSenha] = React.useState(null);
const [msg, setMsg] = React.useState(null);

useEffect(()=>{
    async function getIdUser(){
        let response = await AsyncStorage.getItem('userData');
        let json = JSON.parse(response);
        setIdUser(json.id);
    }
    getIdUser();
});

async function sendForm(){
    let response = await fetch('https://labtrip-backend.herokuapp.com/alterarSenha/verifyPass',{
        method: 'POST',
        body: JSON.stringify({
            id: idUser,
            senhaAntiga: senhaAntiga,
            novaSenha: novaSenha,
            confNovaSenha: confNovaSenha
        }),
        headers:{
            Accept: 'application/json',
            'cContent-Type': 'application/json'
        }
    });
    let json = await response.json();
    setMsg(json);
}

    return (
        <ScrollView
            contentContainerStyle={styles.container}>
            <TextInput placeholder='Senha atual' secureTextEntry={true} style={styles.input} onChangeText={text => setSenhaAntiga(text)}/>
            <TextInput placeholder='Nova senha' secureTextEntry={true} style={styles.input} onChangeText={text => setNovaSenha(text)}/>
            <TextInput placeholder='Confirme a nova senha' secureTextEntry={true} style={styles.input} onChangeText={text => setConfNovaSenha(text)}/>
            <TouchableOpacity style={styles.botaoSalvar}  onPress={()=> sendForm()}>
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