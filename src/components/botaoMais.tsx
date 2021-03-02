import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';


export default function BotaoMais(props){
    return(
        <TouchableOpacity style={styles.botaoMais} onPress={props.onPress}>
              <Image source={require('../imgs/plus-circle.png')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaoMais:{
        margin: '8%'
        
    }
})