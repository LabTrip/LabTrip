import React from 'react';
import {SafeAreaView, StyleSheet, Platform} from 'react-native';

export default function SafeArea(){
    return(
        <SafeAreaView style={styles.droidSafeArea}>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    } 
})