import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Laboratorio from '../components/laboratorio';
import CriarViagem from '../pages/criarViagem';

const { Navigator, Screen } = createStackNavigator();

export default function TelasLaboratorio(){
    return(
      <Navigator>
        <Screen name="Laboratorio" options={{headerShown: false}} component={Laboratorio} />
       <Screen name="CriarViagem" component={CriarViagem} />
      </Navigator>
    );
  }