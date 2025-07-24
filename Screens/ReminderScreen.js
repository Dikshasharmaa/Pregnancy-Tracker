import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TextInput,TouchableOpacity, FlatList} from "react-native";

export default function ReminderScreen(){
    const [reminders, setreminders] = useState([]);
    const [input, setinput]= useState('');

    const addReminder = ()=>{
        if(!input.trim()){
            return;
        }
        setreminders(prev =>[...prev,{id:Date.now().toString, text:input}]);
        setinput('');    

    };

    const removeReminder =(id)=>{
        setreminders(prev= prev.filter(item => item.id !== id));

    };
    return(
        <SafeAreaView>
            <Text>Daily Reminder</Text>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Add a reminder..."
                value={input}
                onChangeText={setinput}
                style={styles.input}
            />
            <TouchableOpacity onPress={addReminder} style={styles.addBtn}>
                <Text style={styles.addText}>➕</Text>
            </TouchableOpacity>
            </View>
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
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    inputContainer: { flexDirection: 'row', alignItems: 'center' },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 16,
    },
    addBtn: {
      marginLeft: 8,
      backgroundColor: '#5DADE2',
      padding: 10,
      borderRadius: 10,
    },
    addText: { color: 'white', fontSize: 18 },
    reminder: {
      backgroundColor: '#f9f9f9',
      padding: 12,
      marginVertical: 6,
      borderRadius: 10,
      elevation: 1,
    },
    reminderText: { fontSize: 16 },
  });
