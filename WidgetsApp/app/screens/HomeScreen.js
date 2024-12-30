import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Picker } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import verses from "../data/poets.json";
import { colors } from "../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [selectedPoets, setSelectedPoets] = useState([]);
  const [randomPoem, setRandomPoem] = useState("");
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false); // State for theme

  useFocusEffect(
    React.useCallback(() => {
      const loadSettings = async () => {
        const storedPoets = await AsyncStorage.getItem("selectedPoets");
        const storedTheme = await AsyncStorage.getItem("darkMode");
        if (storedPoets) setSelectedPoets(JSON.parse(storedPoets));
        if (storedTheme !== null) setDarkMode(JSON.parse(storedTheme));
      };
      loadSettings();
    }, [])
  );

  useEffect(() => {
    generateRandomPoem();
  }, [selectedPoets, language]);

  const generateRandomPoem = () => {
    if (selectedPoets.length === 0) {
      setRandomPoem("No poets selected. Please choose from the list.");
      return;
    }

    const poet =
      selectedPoets[Math.floor(Math.random() * selectedPoets.length)];
    const poetData = verses.find((p) => p.name === poet);
    const poetPoems = poetData?.verses[language] || [];
    const poem = poetPoems[Math.floor(Math.random() * poetPoems.length)] || "";
    const formattedPoem = poem.split(/,,|،،/).join("\n");

    setRandomPoem(formattedPoem + "\n\n- " + poet);
  };

  const theme = darkMode ? colors.dark : colors.light;

  return (
    <LinearGradient colors={theme.gradient} style={styles.gradient}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={language}
            onValueChange={(itemValue) => setLanguage(itemValue)}
            style={[styles.picker, { color: theme.text }]}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Urdu" value="Urdu" />
          </Picker>
        </View>
        <Text style={[styles.poem, { color: theme.text }]}>{randomPoem}</Text>
        <TouchableOpacity
          style={styles.reloadButton}
          onPress={generateRandomPoem}
        >
          <Ionicons name="reload" size={24} color={theme.accent} />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: theme.accent }]}
            onPress={() => navigation.navigate("Poet Selection")}
          >
            <Text style={[styles.navButtonText, { color: theme.textOnAccent }]}>
              Select Poets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              { backgroundColor: theme.secondaryAccent },
            ]}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings" size={20} color={theme.textOnAccent} />
            <Text style={[styles.navButtonText, { color: theme.textOnAccent }]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dropdownContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: { height: 40, width: 150 },
  poem: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontStyle: "italic",
  },
  reloadButton: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  navButtonText: { fontSize: 16 },
});
