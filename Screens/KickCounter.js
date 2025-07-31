import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function KickTrackerScreen() {
  const [count, setCount] = useState(0); //Number of kicks
  const [tracking, setTracking] = useState(false);//to check whether the tracking is active

  const startTracking = () => {
    setCount(0);   //reset the counter
    setTracking(true); //activate the session
  };

  const recordKick = () => {
    setCount(prev => prev + 1); 
  };

  const resetTracking = () => {
    setTracking(false);
    setCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kick Tracker</Text>

      {!tracking ? (
        <TouchableOpacity onPress={startTracking} style={styles.button}>
          <Text style={styles.buttonText}>Start Tracking</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.counter}>Kicks: {count}</Text>

          <TouchableOpacity onPress={recordKick} style={styles.kickButton}>
            <Text style={styles.kickText}>👣 I felt a kick</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={resetTracking} style={styles.resetButton}>
            <Text style={styles.buttonText}>End Session</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  counter: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  kickButton: {
    backgroundColor: '#2196f3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  kickText: {
    color: '#fff',
    fontSize: 20,
  },
});