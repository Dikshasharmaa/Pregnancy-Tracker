import React from "react";
import { SafeAreaView, Text, StyleSheet } from 'react-native';



export default function HomeScreen() {
    return(
    <SafeAreaView style={styles.container}>
       <Text style={styles.header}>Welcome, Mommy!</Text>
       <Text style={styles.subText}>Here’s your daily summary.</Text>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#fff'  },
    header: { fontSize: 24, fontWeight: 'bold', color: '#000'},
    subText: { fontSize: 16, marginTop: 10 },
  });

