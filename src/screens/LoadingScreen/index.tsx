import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import LoadingLogo from './LoadingLogo.js';


const LoadingScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <LoadingLogo />
            <ActivityIndicator size="large" color="#FFFFFF" style={styles.spinner} />
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A89C7',
    },
    spinner: {
        marginTop: 20,
    },
});