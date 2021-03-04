import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';


export default function BotaoLupa(props){
    return(
        <TouchableOpacity style={styles.botaoMais} onPress={props.onPress}>
              <Image source={require('../imgs/search-icon.png')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaoMais:{
        margin: '8%',
    }
})