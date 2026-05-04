import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View, Platform } from 'react-native';

type Props = {
  children: ReactNode;
};

export default function Background({ children }: Props) {
  
    const imagemFundo = Platform.OS === 'web' 
    ? require('../../../assets/ReUse-bg-web.jpg') 
    : require('../../../assets/ReUse-bg.jpg');     

  return (
    <ImageBackground
      source={imagemFundo}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});