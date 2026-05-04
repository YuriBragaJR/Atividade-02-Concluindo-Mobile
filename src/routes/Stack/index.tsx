import React, { useContext } from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { AuthContext } from "../../contexts/AuthContext";

// Importação das Telas
import LoadingScreen from "../../screens/LoadingScreen";
import HomeScreen from "../../screens/Intro"; 
import AboutScreen from "../../screens/About";
import LoginScreen from "../../screens/Login"; 
import TabNavigator from '../TabNavigator'; 

export type RootStackParamList = {
    Home: undefined;
    About: undefined;
    Login: undefined;
    MainHome: undefined; 
    Loading: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {

    const { signed, loading } = useContext(AuthContext);


    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Navigator 
            screenOptions={{ 
                headerShown: false, 
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, 
            }}
        >

            {!signed ? (

                <>
                    <Screen name="Home" component={HomeScreen} />
                    <Screen name="About" component={AboutScreen} />
                    <Screen name="Login" component={LoginScreen} />
                </>
            ) : (

                <>
                    <Screen name="MainHome" component={TabNavigator} />
                </>
            )}
        </Navigator>
    );
}