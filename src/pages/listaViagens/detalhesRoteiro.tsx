import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CardRoteiro from '../../components/cardRoteiro';

export default function DetalhesRoteiro() {
    const [selectedValue, setSelectedValue] = useState();
    return (
        <View style={styles.conteudo}>
            <Text style={styles.texto}>Data</Text>
            <Picker
                prompt="Data"
                selectedValue={selectedValue}
                style={{ height: 48, width: 150 }}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue)
                }}
            >
                <Picker.Item label="21/01/2021" value="21/01/2021" />
                <Picker.Item label="22/01/2021" value="22/01/2021" />

            </Picker>
            <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50"/>
            <CardRoteiro nome="Visita a Arq" local="São Paulo - SP" horario="18:50"/>
            <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50"/>
            <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50"/>
        </View>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: '#fff'
    },
    labelPicker: {
        marginTop: 20,
        marginLeft: '3%',
    },
    texto: {
        margin: 5,
        color: '#999999',
        fontSize: 20,
    },
});
