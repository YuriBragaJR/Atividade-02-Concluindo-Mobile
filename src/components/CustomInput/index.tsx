import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

type Props = {
    placeholder: string;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void; // Adicione isso
    value?: string; // Adicione isso
};

export default function CustomInput({ placeholder, secureTextEntry, onChangeText, value }: Props) {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                placeholder={placeholder} 
                placeholderTextColor="#999"
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText} // Use aqui
                value={value} // Use aqui
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 15,
        height: 50,
        justifyContent: 'center',
        
    },
    input: {
        color: '#000',
        fontSize: 16,
    },
});