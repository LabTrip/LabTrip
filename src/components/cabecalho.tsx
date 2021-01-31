import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Cabecalho() {
    return (
        <View style={styles.cabecalho}>
            <Image source={require('../imgs/logo.png')} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    cabecalho: {
        backgroundColor: '#fff',
        height: 59,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    logo: {
        width: 128,
        height: 39,
        marginTop: 15,
    },
});