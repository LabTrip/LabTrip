import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, RefreshControl, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BotaoMais from '../../components/botaoMais';
import CardRoteiro from '../../components/cardRoteiro';
import normalize from '../../components/fontSizeResponsive'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Roteiro {
    id: string,
    descricao: string,
    dataInicio: Date,
    dataFim: Date,
    statusId: number
}

export default function ListaPropostaDeRoteiro() {
    const moment = require('moment');
    const navigation = useNavigation();
    let token;
    const [roteiros, setRoteiros] = useState<Roteiro[]>([])
    const [refreshing, setRefreshing] = React.useState(false);

    const getViagens = async () => {
        return await fetch('https://labtrip-backend.herokuapp.com/viagens', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
    }

    let listaRoteiros = [
        {
            id: '1',
            descricao: 'Roteiro 1 ',
            dataInicio: new Date,
            dataFim: new Date,
            statusId: 1
        },
        {
            id: '2',
            descricao: 'Roteiro 2',
            dataInicio: new Date,
            dataFim: new Date,
            statusId: 6
        },
        {
            id: '3',
            descricao: 'Roteiro 3',
            dataInicio: new Date,
            dataFim: new Date,
            statusId: 7
        },
        {
            id: '4',
            descricao: 'Roteiro 4',
            dataInicio: new Date,
            dataFim: new Date,
            statusId: null
        }
    ];



    useEffect(() => {
        const request = async () => {
            try {
                const value = await AsyncStorage.getItem('AUTH');
                if (value != null) {
                    token = JSON.parse(value)
                    const response = await getViagens();
                    const json = await response.json();
                    if (response.status == 200) {
                        setRoteiros(json);
                    }
                }
            }
            catch (e) {
                alert(e)
            }
        }
        request()
    }, [refreshing]);



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 0);
    }, [refreshing]);

    return (
        <View style={styles.conteudo}>
            <BotaoMais onPress={() => navigation.navigate('CriarRoteiro')} />
            <View style={styles.containerTop}>
                <Text style={styles.tituloTop}>Propostas de roteiro</Text>
            </View>
            <ScrollView
            contentContainerStyle={{flexGrow: 1}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {
                    listaRoteiros?.map((a) => {
                        return <CardRoteiro key={a.id} nome={a.descricao} dataInicio={moment(a.dataInicio).format('DD/MM/yyyy')} dataFim={moment(a.dataFim).format('DD/MM/yyyy')} 
                        status={a.statusId} item={a} navigate={'CriarRoteiro'} />
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'

    },
    containerTop: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '92%',
        backgroundColor: '#F2F2F2',
        borderRadius: 7,
        height: '10%'
    },
    tituloTop: {
        fontSize: normalize(18)
    }
})