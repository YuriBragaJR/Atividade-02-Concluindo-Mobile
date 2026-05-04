import ExchangePoints from '../../screens/ExchangePoints';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import MainHome from '../../screens/MainHome';
import ScanScreen from '../../screens/ScanScreen';
import Perfil from '../../screens/Perfil'


const LojaScreen = () => <View style={styles.center}><Text>Loja ReUse!</Text></View>;
const Sales = () => <View style={styles.center}><Text>Vendas</Text></View>;


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#2A89C7',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 5 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;


                    if (route.name === 'Início') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Scan') {
                        iconName = focused ? 'qr-code' : 'qr-code-outline';
                    } else if (route.name === 'Loja') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Pontos') {
                    iconName = focused ? 'map' : 'map-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Início" component={MainHome} />
            <Tab.Screen name="Scan" component={ScanScreen} />
            <Tab.Screen name="Loja" component={LojaScreen} />
            <Tab.Screen name="Pontos" component={ExchangePoints} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center'}
});