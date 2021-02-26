import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CardRoteiro from '../../components/cardRoteiro';
import { ScrollView } from 'react-native-gesture-handler';

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
            <ScrollView>
                <CardRoteiro nome="Sarau contra o bolsonaro no IFSP" 
                local="R. Pedro Vicente, 625 - Canindé, São Paulo - SP, 01109-010" horario="18:50" />
                <CardRoteiro nome="Visita a Arq" local="São Paulo - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="Osasco - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50" />
                <CardRoteiro nome="Visita ao IFSP" local="São Paulo - SP" horario="18:50" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: '#fff'
    },
    texto: {
        marginTop: '2%',
        marginLeft: '6%',
        color: '#999999',
        fontSize: 18,
    },
});
