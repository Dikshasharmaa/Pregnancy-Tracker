import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function KickTrackerScreen() {
  const [count, setCount] = useState(0); //Number of kicks
  const [tracking, setTracking] = useState(false);//to check whether the tracking is active
  const [kickHistory, setKickHistory] = useState([]); 
  const [timer, setTimer] = useState(0);
  const timerRef = React.useRef(null);

  useEffect(() => {
    loadKickHistory();
  }, []);
  

  const loadKickHistory = async()=>{
    const saved = await AsyncStorage.getItem('kickHistory');
    if(saved){
        setKickHistory(JSON.parse(saved));
    }
  };

  const handleAutoEnd = async () => {
    const session = {
      id: Date.now().toString(),
      count,
      date: new Date().toLocaleString(),
    };
  
    const updatedHistory = [session, ...kickHistory];
    setKickHistory(updatedHistory);
    await AsyncStorage.setItem('kickHistory', JSON.stringify(updatedHistory));
  
    setTracking(false);
    setCount(0);
    setTimer(0);
  };

  

  const startTracking = () => {
    setCount(0);
  setTracking(true);
  setTimer(2 * 60 * 60); // 2 hours in seconds

  timerRef.current = setInterval(() => {
    setTimer(prev => {
      if (prev <= 1) {
        clearInterval(timerRef.current);
        handleAutoEnd(); // Save session
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  };

  const recordKick = () => {
    if(count<10){
        setCount(prev => prev + 1);
    }
     
  };

  const resetTracking = async() => {
    clearInterval(timerRef.current); 
    const session ={
        id: Date.now().toString(),count,
        date: new Date().toLocaleString(),
    };
    const updatedHistory = [session, ...kickHistory];
    setKickHistory(updatedHistory);
    await AsyncStorage.setItem('KickHistory', JSON.stringify(updatedHistory));
   
    setTracking(false);
    setCount(0);
    setTimer(0);
  };
    const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
    `${hours.toString().padStart(2, '0')}:` +
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}`
  );
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

          <TouchableOpacity onPress={recordKick} style={[styles.kickButton, count >= 10 && { backgroundColor: '#ccc' }]}
          disabled={count >= 10}>
            <Text style={styles.kickText}>
            {count >= 10 ? "✅ Goal Achieved" : "👣 I felt a kick"}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={resetTracking} style={styles.resetButton}>
            <Text style={styles.buttonText}>End Session</Text>
          </TouchableOpacity>
        </>
      )}
        <Text style={styles.timerText}>
            Time Left: {formatTime(timer)}
        </Text>
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
  timerText: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    color: '#555',
  },
});