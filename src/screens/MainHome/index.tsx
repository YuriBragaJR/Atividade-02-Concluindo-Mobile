import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TextInput, 
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const MainHome = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [search, setSearch] = useState('');

    
    useEffect(() => {
        const loadLastSearch = async () => {
            try {
                const savedSearch = await AsyncStorage.getItem('@last_search');
                if (savedSearch !== null) {
                    setSearch(savedSearch);
                }
            } catch (e) {
                console.error("Erro ao carregar busca", e);
            }
        };
        loadLastSearch();
    }, []);


    const saveSearch = async () => {
        try {
            if (search.trim().length > 0) {
                await AsyncStorage.setItem('@last_search', search);
            }
        } catch (e) {
            console.error("Erro ao salvar busca", e);
        }
    };


    const clearSearch = async () => {
        setSearch('');
        try {
            await AsyncStorage.removeItem('@last_search');
        } catch (e) {
            console.error("Erro ao limpar busca", e);
        }
    };


    const carouselItems = [
        { id: '1', image: 'https://images.unsplash.com/photo-1733024083848-16691c886417?q=80' }, 
        { id: '2', image: 'https://images.unsplash.com/photo-1698226927900-60e0009b447b?q=80' }, 
        { id: '3', image: 'https://images.unsplash.com/photo-1568828824716-5e2cac3593c0?q=80' },
    ];

    const recentAds = [
        { id: '1', title: 'Cadeira', price: 'R$ 50', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80' },
        { id: '2', title: 'Teclado Mecânico', price: 'Troca', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80' },
        { id: '3', title: 'Tênis', price: 'R$ 70', image: 'https://images.unsplash.com/photo-1626379530580-6a58c5cf1d5e?q=80' },
        { id: '4', title: 'TV Antiga', price: 'R$ 50', image: 'https://images.unsplash.com/photo-1637686824826-fe0912cc7e61?q=80' },
        { id: '5', title: 'Violão Acústico', price: 'Doação', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80' },
        { id: '6', title: 'Mochila Notebook', price: 'R$ 80', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Superior */}
            <View style={styles.header}>
                <View style={styles.topRow}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>ReUse!</Text>
                    </View>

                    {/* Grupo de ícones à direita */}
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={26} color="white" />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image 
                                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' }} 
                                style={styles.profileImage} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Barra de Busca com Async Storage */}
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#888" />
                    <TextInput 
                        placeholder="Buscar no ReUse!..." 
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                        onBlur={saveSearch}
                        onSubmitEditing={saveSearch}
                        returnKeyType="search"
                    />
                    {/* Botão para limpar a busca (Só aparece se tiver texto) */}
                    {search.length > 0 && (
                        <TouchableOpacity onPress={clearSearch}>
                            <Ionicons name="close-circle" size={20} color="#CCC" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                
                {/* Seção 1: Recomendados (CARROSSEL) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recomendados para você</Text>
                    <Text style={styles.subsectionTitle}>Explore anuncios que escolhemos para você</Text>
                    <View style={styles.carouselWrapper}>
                        <Carousel
                            loop
                            width={width - 40}
                            height={180}
                            autoPlay={true}
                            data={carouselItems}
                            autoPlayInterval={5000}
                            scrollAnimationDuration={1000}
                            onSnapToItem={(index) => setCurrentIndex(index)}
                            renderItem={({ item }) => (
                                <View style={styles.carouselItem}>
                                    <Image 
                                        source={{ uri: item.image }} 
                                        style={styles.carouselImage} 
                                    />
                                </View>
                            )}
                        />

                        <View style={styles.paginationContainer}>
                            {carouselItems.map((_, index) => (
                                <View 
                                    key={index} 
                                    style={[
                                        styles.dot, 
                                        currentIndex === index ? styles.activeDot : styles.inactiveDot
                                    ]} 
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* Seção 2: Anúncios Recentes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Anúncios Recentes</Text>
                    <Text style={styles.subsectionTitle}>Itens adicionados recentemente</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 20 }} 
                    >
                        {recentAds.map((ad) => (
                            <TouchableOpacity key={ad.id} style={styles.itemCard}>
                                <Image source={{ uri: ad.image }} style={styles.cardImage} />
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle} numberOfLines={1}>{ad.title}</Text>
                                    <Text style={styles.cardPrice}>{ad.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        backgroundColor: '#2A89C7',
        padding: 20,
        paddingTop: 40,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoContainer: {
        borderWidth: 4,
        borderColor: '#FFF',
        paddingHorizontal: 8,
        paddingVertical: 1,
        borderRadius: 8,
    },
    logoText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchBar: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
        height: 45,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 35,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subsectionTitle: {
        fontSize: 13,
        marginBottom: 15,
        color: '#555',
    },
    carouselWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselItem: {
        flex: 1,
        borderRadius: 15,
        overflow: 'hidden', 
        backgroundColor: '#E8E8E8',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#2A89C7', 
        width: 20, 
    },
    inactiveDot: {
        backgroundColor: '#CCC',
        width: 8, 
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginRight: 15,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 10,
        height: 10,
        backgroundColor: '#F2B705', 
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#2A89C7',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20, 
    },
    itemCard: {
        width: 200,
        height: 320,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginRight: 15,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, 
        marginBottom: 10, 
    },
    cardImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    cardInfo: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    cardPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2A89C7', 
        marginTop: 4,
    }
});

export default MainHome;