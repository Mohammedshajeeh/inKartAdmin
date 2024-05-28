

import React from 'react';
import { Image, ImageBackground, View, StyleSheet } from "react-native";

const Splash = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/bg3.jpg')} style={styles.background}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/images/logo.png')} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
});

export default Splash;
