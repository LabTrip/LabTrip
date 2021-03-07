import React, { useEffect } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function AlterarSenha({route}) {
    const navigation = useNavigation();
    const {userId, token} = route.params;

    const [idUser, setIdUser] = React.useState('');
    const [senhaAntiga, setSenhaAntiga] = React.useState('');
    const [novaSenha, setNovaSenha] = React.useState('');
    const [confNovaSenha, setConfNovaSenha] = React.useState('');
    const [msg, setMsg] = React.useState('');

    useEffect(()=>{
        console.log(userId)
        setIdUser(userId);
    }, []);

    const alteraSenha = async (body) => {
        return await fetch('https://labtrip-backend.herokuapp.com/login/alterarSenha/' + idUser,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },            
            body: JSON.stringify(body)
        });
    }

    const verificaSenhas = async () => {
        if(novaSenha != confNovaSenha){
        alert("As senhas não conferem.");
        return false;
        }
        return true;
    }
    return (
        <ScrollView
            contentContainerStyle={styles.container}>
            <TextInput placeholder='Senha atual' secureTextEntry={true} style={styles.input} value={senhaAntiga} onChangeText={text => setSenhaAntiga(text)}/>
            <TextInput placeholder='Nova senha' secureTextEntry={true} style={styles.input} value={novaSenha} onChangeText={text => setNovaSenha(text)}/>
            <TextInput placeholder='Confirme a nova senha' secureTextEntry={true} style={styles.input} value={confNovaSenha} onChangeText={text => setConfNovaSenha(text)}/>
            <TouchableOpacity style={styles.botaoSalvar}  onPress={async ()=> {
                    if(await verificaSenhas()){
                        let response = await alteraSenha({
                            senhaAntiga: senhaAntiga,
                            novaSenha: novaSenha});
                        let json = await response.json();
                        
                        if(response.status == 200){
                            alert('Senha alterada com sucesso');
                            navigation.goBack();
                        }
                        else{
                            alert('Erro ao alterar senha.');
                        }
                    }
                    
                }
            }>
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