import React, { useState , useEffect} from "react";
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Text, View, StyleSheet, TextInput,TouchableOpacity, FlatList, Platform} from "react-native";

export default function ReminderScreen() {
    const [reminders, setreminders] = useState([]);
    const [input, setinput] = useState('');
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
  
    useEffect(() => {
      Notifications.requestPermissionsAsync();
      loadReminders();
    }, []);

    const loadReminders = async () => {
        const data = await AsyncStorage.getItem('reminders');
        if (data) setreminders(JSON.parse(data));
      };
  
    const scheduleNotification = async (text, time) => {
      const trigger = new Date(time);
      if (trigger < new Date()) trigger.setDate(trigger.getDate() + 1);
  
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: text,
        },
        trigger,
      });
    };
  
    const addReminder = async () => {
      if (!input.trim()) return;
  
      const newReminder = {
        id: Date.now().toString(),
        text: input,
        time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
  
      await scheduleNotification(input, selectedTime);
  
      const updated = [...reminders, newReminder];
      setreminders(updated);
      setinput('');

  
      await AsyncStorage.setItem('reminders', JSON.stringify(updated));
    };
    const onChangeTime = (event, selected) => {
        setShowPicker(Platform.OS === 'ios');
        if (selected) {
          setSelectedTime(selected);
        }
      };
  
    const removeReminder = async(id) => {
        const updated = reminders.filter(item => item.id !== id);
        setreminders(updated);
        await AsyncStorage.setItem('reminders', JSON.stringify(updated));
    };
  

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Daily Reminder</Text>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Add a reminder..."
                value={input}
                onChangeText={setinput}
                style={styles.input}
                />
            
            </View>
            <View style={styles.actionsRow}>
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeBtn}>
                <Text style={styles.timeText}>⏰ {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={addReminder} style={styles.addBtn}>
                <Text style={styles.addText}>➕</Text>
            </TouchableOpacity>

            </View>

            {showPicker && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onChangeTime}
                />
            )}
        

            <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => removeReminder(item.id)} style={styles.reminder}>
            <Text style={styles.reminderText}>{item.text}</Text>
            </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>No reminders yet.</Text>}
      />

      
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
     
      
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      paddingTop: 40,
      color: '#000',
      textAlign:'center',
    },
    inputContainer: {
      marginBottom: 10,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    timeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#eee',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginTop: 10,
      alignSelf: 'flex-start',
    },
    timeText: {
      fontSize: 16,
      color: '#000',
    },
    addBtn: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
      alignSelf: 'flex-start',
    },
    addText: {
      color: '#fff',
      fontSize: 18,
    },
    reminder: {
      backgroundColor: '#f9f9f9',
      padding: 12,
      borderRadius: 10,
      marginTop: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 1,
    },
    reminderText: {
      fontSize: 16,
      color: '#333',
    },
  });