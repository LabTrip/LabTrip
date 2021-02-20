import React, {useState} from 'react';
import { StyleSheet, Text, Image, View, TextInput, Switch, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


export default function EditarViagem() {
    const navigation = useNavigation();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [apelidoViagem, onChangeTextApelidoViagem] = React.useState('Mundo de Terabitia');
    const [dataInicio, onChangeTextDataInicio] = React.useState('05/07/2021');
    const [dataFim, onChangeTextDataFim] = React.useState('21/07/2021');
    const [localViagem, onChangeTextLocalViagem] = React.useState('Terabitia');
    const [nomeParticipante, onChangeTextNomeParticipante] = React.useState('Ednaldo Pereira');

  return (
    <View style={styles.container} >
        <ScrollView>
            <TextInput placeholder={"Apelido da viagem"} value={apelidoViagem} style={styles.input} 
                onChangeText={text => onChangeTextApelidoViagem(text)}/>
            <View style={styles.containerData}>
                <TextInput placeholder={"Data início"} value={dataInicio} style={styles.inputData}
                    onChangeText={text => onChangeTextDataInicio(text)}/>
                <TextInput placeholder={"Data fim"} value={dataFim} style={styles.inputData}
                    onChangeText={text => onChangeTextDataFim(text)}/>
            </View>
            <TextInput placeholder={"Local da viagem"} value={localViagem} style={styles.input}
                onChangeText={text => onChangeTextLocalViagem(text)}/>
            <TextInput placeholder={"Adicionar participantes"} value={nomeParticipante} style={styles.input}
                onChangeText={text => onChangeTextNomeParticipante(text)}/>
        
            <View style={styles.participantes}>
                <View style={styles.participanteIndividual}>
                    <Image source={require('../imgs/perfil.png')} style={styles.fotoPerfil} />
                        
                        <View style={styles.proprietario}>
                            <Text style={styles.textoParticipante}>Ednaldo Pereira</Text>
                            <View style={styles.proprietarioSwitch}>
                                <Switch trackColor={{ false: "#767577", true: "#ff809b"}}
                                        thumbColor={isEnabled ? "#db0a38" : "#f4f3f4"}
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                />
                                <Text style={styles.textoParticipante}>Proprietário</Text>
                            </View>
                        </View>
                    <TouchableOpacity onPress = {() => navigation.navigate('MenuBar')}>
                        <Text style={styles.xis}>X</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.participanteIndividual}>
                    <Image source={require('../imgs/perfil.png')} style={styles.fotoPerfil} />
                        
                        <View style={styles.proprietario}>
                            <Text style={styles.textoParticipante}>Ednaldo Pereira</Text>
                            <View style={styles.proprietarioSwitch}>
                                <Switch trackColor={{ false: "#767577", true: "#ff809b"}}
                                        thumbColor={isEnabled ? "#db0a38" : "#f4f3f4"}
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                />
                                <Text style={styles.textoParticipante}>Proprietário</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress = {() => navigation.navigate('MenuBar')}>
                        <   Text style={styles.xis}>X</Text>
                        </TouchableOpacity>
                </View>
            </View>
        
            <View style={styles.confirmar}>
            <TouchableOpacity style={styles.botaoSalvar} onPress={() => navigation.navigate('MenuBar')}>
                        <Text style={styles.botaoSalvarTexto}>Salvar viagem</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: '100%', 
        backgroundColor: '#fff',
        alignContent: 'center',
        
    },

    containerData:{
        flexDirection: 'row',
        justifyContent: 'center'
    },

    input: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 15,
        fontSize: 16,
        borderRadius: 41,
        backgroundColor: '#EBEBEB',
        color: '#333333',
        
    },
    inputData: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 15,
        fontSize: 16,
        borderRadius: 41,
        backgroundColor: '#EBEBEB',
        color: '#333333',
        width: '45%'
    },

    participantes: {
        borderStyle: 'dotted',
        borderColor: '#333333',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 10,
        marginHorizontal: 10,
        alignItems: 'center'
    },

    participanteIndividual: {
        flexDirection: 'row',
        //width: '90%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 26,
        paddingBottom: 10,
        paddingLeft: 10,
        margin: 10
    },

    proprietario: {
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10
    },

    proprietarioSwitch: {
        flexDirection: 'row'
    },

    textoParticipante: {
        color: 'black', 
        fontSize: 18
    },

    xis: {
        paddingLeft: 100,
        color: 'red',
        fontSize: 22,
        margin: 10
    },

    fotoPerfil: {
        borderRadius: 50,
        marginTop: 10,
        width: 50,
        height: 50
    },

    confirmar: {
        alignItems: 'center'
    },

    botaoSalvar: {
        backgroundColor: '#3385FF',
        width: 180,
        height: 50,
        padding: 10,
        borderRadius: 40,
        marginTop: 30,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    botaoSalvarTexto: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 24
    }

});