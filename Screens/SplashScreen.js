import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace("Tabs"); 
    }, 2000); 

    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/mom.gif")} 
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:
   { flex: 1, 
    justifyContent: "center",
     alignItems: "center", 
     backgroundColor: "#fff" },
  logo: 
  { width: 220, 
    height: 220, 
    resizeMode: "contain" },
});