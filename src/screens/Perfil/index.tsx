import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/AuthContext';


const ProfileScreen = () => {

    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const { signOut } = useContext(AuthContext);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };


const handleLogout = () => {
    if (Platform.OS === 'web') {

        const confirmou = window.confirm("Tem certeza que deseja sair do ReUse!?");
        if (confirmou) {
            signOut();
        }
    } else {

        Alert.alert(
            "Sair da Conta",
            "Tem certeza que deseja sair do ReUse!?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sair", style: "destructive", onPress: () => signOut() }
            ]
        );
    }
};

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editIcon}>
                                <Ionicons name="pencil" size={16} color="#2A89C7" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>Nome do Usuário</Text>
                            <Text style={styles.userHandle}>@ID_Usuario</Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="location-sharp" size={16} color="white" />
                                <Text style={styles.userLocation}>Santo André - SP</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.balanceCard}>
                    <Text style={styles.balanceTitle}>Seu saldo ReCoins</Text>
                    <View style={styles.balanceRow}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3258/3258446.png' }}
                            style={styles.coinIcon}
                        />
                        <Text style={styles.balanceValue}>2.450</Text>
                        <Text style={styles.balanceUnit}>RC</Text>
                    </View>
                </View>


                <View style={styles.gridContainer}>
                    <View style={styles.row}>
                        <MenuButton icon="settings-outline" label="Configurações" />
                        <MenuButton icon="stats-chart-outline" label="Ranking" />
                    </View>
                    <View style={styles.row}>
                        <MenuButton icon="ribbon-outline" label="Nível e conquistas" />
                        <MenuButton icon="notifications-outline" label="Notificações" />
                    </View>
                </View>

                <View style={styles.listSection}>
                    <Text style={styles.sectionTitle}>Perfil e Conta</Text>


                    <ListItem
                        icon="people-outline"
                        label="Conexões e Redes"
                        isExpanded={expandedSection === 'conexoes'}
                        onPress={() => toggleSection('conexoes')}
                    >
                        <View style={styles.accordionContent}>
                            <View style={styles.connectionItem}>
                                <Ionicons name="logo-google" size={20} color="#DB4437" />
                                <Text style={styles.connectionText}>Conta Google Vinculada</Text>
                            </View>
                            <View style={styles.connectionItem}>
                                <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                                <Text style={styles.connectionText}>Vincular Facebook</Text>
                            </View>
                        </View>
                    </ListItem>


                    <ListItem
                        icon="document-text-outline"
                        label="Suas informações"
                        isExpanded={expandedSection === 'infos'}
                        onPress={() => toggleSection('infos')}
                    >
                        <View style={styles.accordionContent}>
                            <Text style={styles.infoText}><Text style={styles.bold}>E-mail:</Text> usuario@email.com</Text>
                            <Text style={styles.infoText}><Text style={styles.bold}>Telefone:</Text> (11) 99999-9999</Text>
                            <Text style={styles.infoText}><Text style={styles.bold}>Endereço:</Text> Santo André - SP</Text>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.editButtonText}>Editar Dados</Text>
                            </TouchableOpacity>
                        </View>
                    </ListItem>


                    <ListItem
                        icon="help-circle-outline"
                        label="Ajuda e Suporte"
                        isExpanded={expandedSection === 'ajuda'}
                        onPress={() => toggleSection('ajuda')}
                    >
                        <View style={styles.accordionContent}>
                            <TouchableOpacity><Text style={styles.helpLink}>Como funcionam as trocas?</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.helpLink}>Como ganhar ReCoins?</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.helpLink}>Falar com o Suporte</Text></TouchableOpacity>
                        </View>
                    </ListItem>


                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <View style={styles.listItemLeft}>
                            <Ionicons name="exit-outline" size={24} color="#E74C3C" />
                            <Text style={styles.logoutText}>Sair da conta</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};


const MenuButton = ({ icon, label }: { icon: any, label: string }) => (
    <TouchableOpacity style={styles.menuButton}>
        <Ionicons name={icon} size={30} color="#2A89C7" />
        <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
);

const ListItem = ({ icon, label, isExpanded, onPress, children }: any) => (
    <View style={styles.accordionContainer}>
        <TouchableOpacity style={styles.listItem} onPress={onPress}>
            <View style={styles.listItemLeft}>
                <Ionicons name={icon} size={24} color="#2A89C7" />
                <Text style={styles.listItemLabel}>{label}</Text>
            </View>
            <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#CCC" />
        </TouchableOpacity>

        {/* Se estiver expandido, renderiza o conteúdo de dentro */}
        {isExpanded && (
            <View style={styles.expandedArea}>
                {children}
            </View>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        backgroundColor: '#2A89C7',
        padding: 30,
        paddingTop: 50,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    profileInfo: { flexDirection: 'row', alignItems: 'center' },
    avatarContainer: { position: 'relative' },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: 'white' },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
        elevation: 5,
    },
    userDetails: { marginLeft: 20 },
    userName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    userHandle: { color: 'white', fontSize: 16, opacity: 0.9 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    userLocation: { color: 'white', fontSize: 14, marginLeft: 5 },

    balanceCard: {
        backgroundColor: '#3498DB',
        margin: 20,
        borderRadius: 15,
        padding: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    balanceTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    balanceRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    coinIcon: { width: 40, height: 40, marginRight: 10 },
    balanceValue: { color: 'white', fontSize: 36, fontWeight: 'bold' },
    balanceUnit: { color: 'white', fontSize: 18, marginLeft: 5, marginTop: 10 },

    gridContainer: { paddingHorizontal: 10 },
    row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
    menuButton: {
        backgroundColor: 'white',
        width: '44%',
        height: 100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    menuLabel: { color: '#2A89C7', fontSize: 13, fontWeight: 'bold', marginTop: 8, textAlign: 'center' },

    listSection: { padding: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2A89C7', marginBottom: 15 },

    // Estilos do Acordeão
    accordionContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EEE',
        overflow: 'hidden', 
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    listItemLeft: { flexDirection: 'row', alignItems: 'center' },
    listItemLabel: { fontSize: 16, marginLeft: 15, fontWeight: '500', color: '#333' },

    // Estilos da Área Expandida
    expandedArea: {
        backgroundColor: '#FAFAFA',
        borderTopWidth: 1,
        borderColor: '#EEE',
    },
    accordionContent: {
        padding: 15,
    },
    connectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    connectionText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#555',
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    bold: {
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        marginTop: 10,
        backgroundColor: '#2A89C7',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    helpLink: {
        fontSize: 14,
        color: '#2A89C7',
        marginBottom: 12,
        textDecorationLine: 'underline',
    },

    // Estilo Botão de Sair
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#FADBD8',
    },
    logoutText: {
        fontSize: 16,
        marginLeft: 15,
        fontWeight: 'bold',
        color: '#E74C3C',
    }
});

export default ProfileScreen;