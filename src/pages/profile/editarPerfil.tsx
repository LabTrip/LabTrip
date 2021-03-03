import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const moment = require('moment');

interface Usuario {
    nome: string,
    email: string,
    telefone: string
    dataNascimento: string
}

export default function EditarPerfil({ route }) {
    const [nome, onChangeTextNome] = React.useState('Ednaldo Pereira');
    const [email, onChangeTextEmail] = React.useState('ednaldo.chance@yahoo.com.br');
    const [data, onChangeTextData] = React.useState('17/10/1967');
    const [telefone, onChangeTextTelefone] = React.useState('(11) 4002-8922');
    const { token } = route.params;
    let Token;
    let userId;
    const [usuario, setUsuario] = useState<Usuario>()
    const getViagens = async () => {
        return await fetch('https://labtrip-backend.herokuapp.com/usuarios/' + userId , {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        'Content-Type': 'application/json',
            'x-access-token': Token
        }
        });
    }

    useEffect(() => {
        const request = async () => {
        try{
            const value = await AsyncStorage.getItem('AUTH');            
            const user = await AsyncStorage.getItem('USER_ID');
            //setToken(value);
            if(value !== null){
                Token = JSON.parse(value)
            }
            console.log(user)
            if(user !== null){
                userId = JSON.parse(user)
            }
            console.log(Token)
            const response = await getViagens();
            const json = await response.json();
            console.log(response.status)
            if(response.status == 200){
            setUsuario(json);
            }
        }
        catch(e){
            console.log(e)
        }
        }

        request()
        
    }, [])

    return (

        <View style={styles.container}>
            {console.log('caiu no profile ' + token)}
            <ScrollView>
                <View style={styles.conteudo}>
                    <TouchableOpacity>
                        <Image source={require('../../imgs/perfil.png')} style={styles.fotoPerfil} />
                    </TouchableOpacity>
                    <TextInput placeholder={"Nome"} value={usuario?.nome} style={styles.input}
                        onChangeText={text => onChangeTextNome(text)} />
                    <TextInput placeholder={"Email"} value={usuario?.email} style={styles.input}
                        onChangeText={text => onChangeTextEmail(text)} />
                    <TextInput placeholder={"Data de nascimento"} value={moment(usuario?.dataNascimento).format('DD/MM/yyyy')} style={styles.input}
                        onChangeText={text => onChangeTextData(text)} />
                    <TextInput placeholder={"Telefone"} value={usuario?.telefone} style={styles.input}
                        onChangeText={text => onChangeTextTelefone(text)} />
                    <TouchableOpacity>
                        <Text style={styles.link}>
                            Redefinir senha
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoSalvar} >
                        <Text style={styles.botaoSalvarTexto}>Salvar</Text>
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
    botaoSalvarTexto: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 24,
    },
    link: {
        marginTop: 30,
        textDecorationLine: 'underline',
        fontSize: 20,
    }
});