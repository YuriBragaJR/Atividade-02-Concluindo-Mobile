import React from "react";
import { Text, StyleSheet } from 'react-native';

const SubTextLink = () => {
    return (
        <Text style={styles.textBottom}>ou
        <Text style={styles.textBottomLink}> Cadastre-se</Text></Text>
    );

};

const styles = StyleSheet.create({
    textBottom: {
        marginTop: 20,
        color: '#fcfcfc',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowRadius: 8,
        textShadowColor: '#000',
    },
    textBottomLink: {
        marginTop: 20,
        color: '#2A89C7',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowRadius: 8,
        textShadowColor: '#000',
    },
});


export default SubTextLink;
