import React from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';


export default function BarraPesquisa(props) {
    const funcao = props.funcao;
    return (
        <View style={styles.barra}>
            <TextInput placeholder={props.texto} style={styles.input} />
            <TouchableOpacity>
                <Image source={require('../imgs/filter.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    barra: {
        width: '100%',
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    },
    input: {
        marginRight: 25,
        width: 266,
        height: 30,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 32,
      },
}
);