import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomOutline from "../../components/CustomOutline";
import Background from "../../components/Background";
import SubTextLink from "./SubTextLink";
import Logo from "./Logo";
import { RootStackParamList } from "../../routes/Stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;



const Home = () => {
    const navigation = useNavigation<NavigationProp>();

    return (

        <Background>
            <SafeAreaView style={styles.container}>
                <Logo/>
                <Text style={styles.subtexto}>Troque objetos, reduza desperdício e consuma com consciência.</Text>
                <CustomButton title='Sobre a ReUse!' onPress={() => navigation.navigate("About")} />
                <CustomOutline title='Login' onPress={() => navigation.navigate("Login")} />
                <SubTextLink></SubTextLink>
            </SafeAreaView>
        </Background>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: Platform.OS === 'web' ? 'center' : 'flex-end',
        alignItems: 'center',
        padding: 20,
        paddingBottom: Platform.OS === 'web' ? 20 : 30,
        backgroundColor: "rgba(0,0,0,0.5)",
        width: '100%'
    },
    subtexto: {
        color: '#FFF',
        fontWeight: '600',
        textAlign: 'center',
        textShadowRadius: 8,
        textShadowColor: '#000',
        fontSize: 15,
        marginBottom: 20, 
    },
});




export default Home;