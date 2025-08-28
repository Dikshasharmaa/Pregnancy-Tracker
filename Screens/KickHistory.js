import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function KickHistoryScreen() {
  const [kickData, setKickData] = useState([]);

  useEffect(() => {
    const fetchKicks = async () => {
      const data = await AsyncStorage.getItem('kickHistory');
      if (data) setKickData(JSON.parse(data));
    };
    fetchKicks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kick History</Text>
      <FlatList
        data={kickData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>Date: {item.date}</Text>
            <Text>Count: {item.kicks}</Text>
            <Text>Duration: {item.duration} min</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No kick history yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  entry: { marginBottom: 15, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 8 },
});