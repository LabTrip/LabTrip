import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CardRoteiro from '../../components/cardRoteiro';
import ScrollViewFlat from '../../components/scrollViewFlat';

export default function DetalhesRoteiro() {
    const [selectedValue, setSelectedValue] = useState();

    let participantesData = [
        {
            id: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
            nome: "Visita ao IFSP",
            local: "R. Pedro Vicente, 625 - Canindé, São Paulo - SP, 01109-010",
            horario: "18:50",
        },
        {
            id: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
            nome: "Café da Torre Eiffel",
            local: "Paris, França",
            horario: "20:00",
        },
        {
            id: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
            nome: "Visita ao Louvre",
            local: "Paris, França",
            horario: "22:00",
        },
    ];

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
            <ScrollViewFlat>
                <FlatList
                    data={participantesData}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <CardRoteiro nome={item.nome} local={item.local} horario={item.horario} />
                    )}
                />
            </ScrollViewFlat>
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
