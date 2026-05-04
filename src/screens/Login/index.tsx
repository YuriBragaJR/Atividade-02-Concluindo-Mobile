import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/Stack";

import Background from "../../components/Background";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Logo from "../Intro/Logo";


import { AuthContext } from "../../contexts/AuthContext";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const Login = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { signIn } = useContext(AuthContext);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }


        try {
            await signIn({
                id: '1',
                name: 'Usuário ReUse',
                email: email
            });

        } catch (error) {
            Alert.alert("Erro", "Não foi possível realizar o login.");
        }
    };

    return (
        <Background>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.content}>
                    <Logo />
                    <Text style={styles.title}>Bem-vindo de volta!</Text>
                    
<CustomInput 
    placeholder="E-mail" 
    value={email}
    onChangeText={setEmail}
/>

<CustomInput 
    placeholder="Senha" 
    secureTextEntry={true}
    value={password}
    onChangeText={setPassword}
/>

                    <CustomButton title="Entrar" onPress={handleLogin} />
                    
                    <Text 
                        style={styles.backLink} 
                        onPress={() => navigation.goBack()}
                    >
                        Voltar
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </Background>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '90%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 15,
        alignItems: 'center',
    },
    title: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    backLink: {
        color: '#FFF',
        marginTop: 20,
        textDecorationLine: 'underline',
    }
});