import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BarraPesquisa from '../../components/barraPesquisa';
import CardViagem from '../../components/cardViagem';
import ScrollViewFlat from '../../components/scrollViewFlat';


const Tab = createMaterialBottomTabNavigator();

export default function ListaEditarViagens() {
  const navigation = useNavigation();
  let viagensData = [
    {
      id: 'a6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      nome: "Fim de semana em Ubatuba",
      dataInicio: "26/02/2021",
      dataFim: "28/02/2021",
      local: "Ubatuba - SP",
      status: "Agendada",
      navigate: "EditarViagem"
    },
    {
      id: 'a6b86b273ff34fce19d6b804efaaaf5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      nome: "Fim de semana em Ubatuba",
      dataInicio: "26/02/2021",
      dataFim: "28/02/2021",
      local: "Ubatuba - SP",
      status: "Em andamento",
      navigate: "EditarViagem"
    },
    {
      id: '4e07408562bedb8b60aaaace05c1decfe3ad16b72230967de01f640b7e4729b49fce',
      nome: "Fim de semana em Ubatuba",
      dataInicio: "26/02/2021",
      dataFim: "28/02/2021",
      local: "Ubatuba - SP",
      status: "Concluida",
      navigate: "EditarViagem"
    },
    {
      id: '4e07408562bedb8b60ce05c1decfe3ad16b72230961fe01f640b7e4729baaa49fce',
      nome: "Fim de semana em Ubatuba",
      dataInicio: "26/02/2021",
      dataFim: "28/02/2021",
      local: "Ubatuba - SP",
      status: "Cancelada",
      navigate: "EditarViagem"
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <BarraPesquisa texto={'Pesquisar viagem...'} />
      
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('CriarViagem')}>
            <Image source={require('../../imgs/plus-circle.png')} />
          </TouchableOpacity>
        </View>
        
          <FlatList
            style={{ flexGrow: 1, flex: 1, flexDirection: 'column'}}
            contentContainerStyle={{alignItems: 'center'}}
            data={viagensData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardViagem nome={item.nome} dataInicio={item.dataInicio} dataFim={item.dataFim}
                local={item.local} status={item.status} navigate={item.navigate} item={item} />
            )}
          />
      
    </View >
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
  },
  botaoMais: {
    marginTop: 20,
  }
});
