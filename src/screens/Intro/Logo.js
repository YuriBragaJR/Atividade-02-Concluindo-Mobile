import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            {<Image source={require('../../../assets/reuse-icon.png')} style={styles.icon} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    icon: {
        width: 130,
        height: 60,
        marginBottom: 10,
    },

});

export default Logo;