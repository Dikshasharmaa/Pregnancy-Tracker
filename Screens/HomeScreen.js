import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.header}>Welcome, Mommy! 👶💖</Text>
                <Text style={styles.subText}>Here’s your daily summary</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fcefee' // soft baby-pink background
    },
    headerBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
    },
    header: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        color: '#333', 
        textAlign: 'center'
    },
    subText: { 
        fontSize: 16, 
        marginTop: 8, 
        color: '#666', 
        textAlign: 'center'
    },
});