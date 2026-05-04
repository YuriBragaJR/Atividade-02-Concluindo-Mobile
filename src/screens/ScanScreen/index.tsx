import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function Scan() {

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);


    if (!permission) {
        return <View style={styles.container} />;
    }


    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    O ReUse! precisa de acesso à sua câmera para escanear um QRCode.
                </Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Permitir Câmera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
        setScanned(true);
        Alert.alert(
            "Objeto Encontrado!",
            `Código lido: ${data}\n\nDeseja adicionar este item à sua lista de trocas?`,
            [{ text: "OK", onPress: () => console.log("Item adicionado: ", data) }]
        );
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />

            <View style={styles.overlay}>
                <View style={styles.unfocusedContainer}></View>
                <View style={styles.middleContainer}>
                    <View style={styles.unfocusedContainer}></View>
                    <View style={styles.focusedContainer}>
                        {/* As bordas amarelas da mira */}
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </View>
                    <View style={styles.unfocusedContainer}></View>
                </View>
                <View style={styles.unfocusedContainer}>
                    <Text style={styles.scanText}>Aponte para o QR Code do objeto</Text>
                    
                    {scanned && (
                        <TouchableOpacity style={styles.btnScanAgain} onPress={() => setScanned(false)}>
                            <Text style={styles.btnScanAgainText}>Escanear Novamente</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
    },
    permissionText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#5A7302',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    unfocusedContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        flexDirection: 'row',
        flex: 1.5,
    },
    focusedContainer: {
        flex: 4,
        position: 'relative',
    },
    scanText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 8,
    },
    btnScanAgain: {
        backgroundColor: '#2A89C7',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20,
    },
    btnScanAgainText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: '#2A89C7',
    },
    topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
    topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
    bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
    bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 },
});