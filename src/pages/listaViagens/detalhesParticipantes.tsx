import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import BotaoMais from '../../components/botaoMais';
import CardParticipante from '../../components/cardParticipante';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Viagem {
    id: string,
    descricao: string,
    dataInicio: Date,
    dataFim: Date,
    statusId: number,
    participantes : [
        usuarioId: string,
        permissaoViagemId: string
    ]
  }

export default function DetalhesParticipantes() {
    const navigation = useNavigation();
    let token;
    const [refreshing, setRefreshing] = React.useState(false);


    let participantesData = [
        {
            id: '1',
            nome: "Ednaldo Pereira",
            dono: true,
            proprietario: true
        },
        {
            id: '2',
            nome: "Ednaldo Pereiro",
            dono: false,
            proprietario: true
        },
        {
            id: '3',
            nome: "Ednalda Pereira",
            dono: false,
            proprietario: false
        },
        {
            id: '50',
            nome: "Ednalda Pereira50mano",
            dono: false,
            proprietario: false
        }
    ];

    let [listData, setListData] = React.useState(participantesData);
    const [participantes, setParticipantes] = React.useState<Viagem[]>([]);
    const [id, setId] = useState(4);

    let [addUser, setAddUser] = React.useState({
        id: id.toString(),
        nome: "Testeaaaa n" + id.toString(),
        dono: true,
        proprietario: true,
    });



    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        setListData(participantesData.concat(addUser));
        setRefreshing(false)
    }, [refreshing]);

    const getViagem = async () => {
        return await fetch('https://labtrip-backend.herokuapp.com/viagens/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
      }
    
      useEffect(() => {
        const request = async () => {
          try {
            const value = await AsyncStorage.getItem('AUTH');
            if (value != null) {
              token = JSON.parse(value)
              const response = await getViagem();
              const json = await response.json();
              if (response.status == 200) {
                setParticipantes(json);
                console.log(json)
              }
            }
          }
          catch (e) {
            console.log(e)
          }
        }
        request()
      }, []);

    return (
        <View style={styles.container}>
            <BotaoMais onPress={() => {
                setId(id + 1);
                setAddUser({
                    id: id.toString(),
                    nome: "Participante extra n" + id.toString(),
                    dono: true,
                    proprietario: true,
                })
                console.log(addUser)
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
