import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Switch, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CardParticipante(props) {
    let icon, color;
    const [isEnabled, setIsEnabled] = useState(props.proprietario);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    if (props.dono == true) {
        icon = 'crown';
        color = '#575757';
    } else {
        icon = 'close-thick';
        color = 'red';

    }
    return (
        <View style={styles.cardParticipante}>
            <Image source={require('../imgs/perfil.png')} style={styles.fotoPerfil} />
            <View style={styles.headerCardParticipante}>
                <Text style={styles.textoParticipante}> {props.nome}
            
                </Text>
                <View style={styles.containerProprietarioSwitch}>
                    <Switch trackColor={{ false: "#767577", true: "#ff809b" }}
                        thumbColor={isEnabled ? "#db0a38" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style={styles.textoParticipante}>Proprietário</Text>
                </View>
            </View>

            <TouchableOpacity>
            <MaterialCommunityIcons name={icon} color={color} size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardParticipante: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '3%',
        width: '95%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 26,
        marginTop: '3%',
        marginBottom: '3%',
    },
    containerProprietarioSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    textoParticipante: {
        color: 'black',
        fontSize: 18,
        width: '60%',
        maxWidth: '60%',
        flexWrap: 'wrap',
        textAlign: 'center'
    },

    xis: {
        color: 'red',
        fontSize: 22,
    },
    fotoPerfil: {
        borderRadius: 50,
        width: 60,
        height: 60
    },
    headerCardParticipante: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});