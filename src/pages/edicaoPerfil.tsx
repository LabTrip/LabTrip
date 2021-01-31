import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Text, View, Image, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Cabecalho from '../components/cabecalho';
import { SafeAreaView } from 'react-navigation';

export default function EdicaoPerfil() {
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <Cabecalho />
            <View style={styles.conteudo}>
                <TouchableOpacity>
                    <Image source={require('../imgs/perfil.png')} style={styles.fotoPerfil} />
                </TouchableOpacity>
                <TextInput placeholder={"Nome"} value={"Ednaldo Pereira"} style={styles.input} />
                <TextInput placeholder={"Nome"} value={"ednaldo.chance@yahoo.com.br"} style={styles.input} />
                <TextInput placeholder={"Nome"} value={"17/10/1967"} style={styles.input} />
                <TextInput placeholder={"Nome"} value={"(11) 4002-8922"} style={styles.input} />
                <TouchableOpacity>
                    <Text style={styles.link}>
                        Redefinir senha
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoSalvar} >
                    <Text style={styles.botaoSalvarTexto}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    conteudo: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
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