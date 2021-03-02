import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import BotaoMais from '../../components/botaoMais';
import CardParticipante from '../../components/cardParticipante';
import { useNavigation } from '@react-navigation/native';

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function DetalhesParticipantes() {
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = React.useState(false);

    let participantesData = [
        {
            id: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
            nome: "Ednaldo Pereira",
            dono: true,
            proprietario: true
        },
        {
            id: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
            nome: "Ednaldo Pereiro",
            dono: false,
            proprietario: true
        },
        {
            id: '4e07408562bed22b8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
            nome: "Ednalda Pereira",
            dono: false,
            proprietario: false
        },
    ];

    let [listData, setListData] = React.useState(participantesData);

    let [addUser, setAddUser] = React.useState({
        id: '0',
        nome: "Participante 0",
        dono: false,
        proprietario: false
    });

    const [id, setId] = useState(0);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        setListData(participantesData.concat(addUser));
        setRefreshing(false)
    }, [refreshing]);

    return (
        <View style={styles.container}>
            <BotaoMais onPress={() => {
                setId(id + 1);
                setAddUser({
                    id: id.toString(),
                    nome: "Participantebobobo " + id,
                    dono: false,
                    proprietario: false
                });

            }} />
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                data={listData}

                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) => {
                    const backgroundColor = item.proprietario === true ? "#CCEEFF" : "#787878";
                    return (
                        <CardParticipante nome={item.nome} dono={item.dono} proprietario={item.proprietario}
                            style={{ backgroundColor }}
                        />
                    )
                }
                }


            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
})
