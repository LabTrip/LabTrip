import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function DetalhesRoteiro() {
    const [selectedValue, setSelectedValue] = useState();
    return (
        <View style={styles.conteudo}>
            <View>
                <Text style={styles.labelPicker}>Data</Text>
                <Picker

                    selectedValue={selectedValue}
                    style={{ height: 48, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue)
                    }}
                >
                    <Picker.Item label="21/01/2021" value="21/01/2021" />
                    <Picker.Item label="22/01/2021" value="22/01/2021" />
                </Picker>
            </View>
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
        color: '#999999',
        fontSize: 18,

    }
});
