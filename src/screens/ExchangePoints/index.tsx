import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';



const MOCK_POINTS = [
    { id: 1, name: "Bazar Beneficente ABC", lat: -23.6550, lng: -46.5390, desc: "Doação e venda de roupas, calçados e livros" },
    { id: 2, name: "Brechó ReUse! Jardim", lat: -23.6480, lng: -46.5300, desc: "Móveis e eletrodomésticos em bom estado" },
    { id: 3, name: "Centro de Doação Utinga", lat: -23.6260, lng: -46.5350, desc: "Troca de brinquedos e utilidades domésticas" }
];

export default function ExchangePoints() {
    const [loading, setLoading] = useState(true);
    const [selectedPoint, setSelectedPoint] = useState(MOCK_POINTS[0]);

    useEffect(() => {
        loadApiData();
    }, []);


    const loadApiData = async () => {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/09015080`);
            console.log("✅ Integração Axios funcionando! Bairro validado:", response.data.neighborhood);
        } catch (err) {
            console.log("Erro na validação da API");
        } finally {
            setLoading(false); 
        }
    };


    const getMapUrl = () => {
        const lat = selectedPoint.lat;
        const lng = selectedPoint.lng;
        const zoom = 0.002; 
        

        return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-zoom},${lat-zoom},${lng+zoom},${lat+zoom}&layer=mapnik&marker=${lat},${lng}`;
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2A89C7" />
                <Text style={{marginTop: 10}}>Preparando o mapa...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* CABEÇALHO */}
<View style={styles.header}>
                <Text style={styles.title}>Rede ReUse!</Text>
                <Text style={styles.subtitle}>Encontre bazares e pontos de doação</Text>
            </View>

            {/* MAPA DINÂMICO (Atualiza ao clicar) */}
            <View style={styles.mapBox}>
                <WebView 
                    source={{ uri: getMapUrl() }} 
                    style={styles.map}
                    key={selectedPoint.id}
                />
            </View>

            {/* LISTA INTERATIVA */}
            <View style={styles.listArea}>
                <Text style={styles.sectionTitle}>Locais para doação, troca ou venda:</Text>
                
                {MOCK_POINTS.map(point => {
                    const isSelected = selectedPoint.id === point.id;
                    return (
                        <TouchableOpacity 
                            key={point.id} 
                            style={[styles.pointCard, isSelected && styles.selectedCard]}
                            onPress={() => setSelectedPoint(point)} 
                        >
                            <View style={[styles.dot, isSelected && styles.selectedDot]} />
                            <View>
                                <Text style={[styles.pointName, isSelected && styles.selectedText]}>{point.name}</Text>
                                <Text style={styles.pointDesc}>{point.desc}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    header: { padding: 25, paddingTop: 50, backgroundColor: '#FFF', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#2A89C7' },
    subtitle: { fontSize: 13, color: '#666', marginTop: 4 },
    mapBox: { height: '40%', width: '100%', backgroundColor: '#e5e5e5' },
    map: { flex: 1 },
    listArea: { flex: 1, padding: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    pointCard: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FFF', 
        padding: 15, 
        borderRadius: 12, 
        marginBottom: 10,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#eee'
    },
    selectedCard: { borderColor: '#2A89C7', backgroundColor: '#f9fcf5', borderWidth: 2 },
    dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ccc', marginRight: 15 },
    selectedDot: { backgroundColor: '#2A89C7' },
    pointName: { fontSize: 15, color: '#444', fontWeight: 'bold' },
    selectedText: { color: '#2A89C7' },
    pointDesc: { fontSize: 12, color: '#777', marginTop: 2 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});