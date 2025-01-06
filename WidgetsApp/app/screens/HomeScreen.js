import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
    //document.title = "Poetry App";
    generateRandomPoem();
    console.log("Navigation prop:", navigation);
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
        <TouchableOpacity
          style={[
            styles.settingsButton,
            { backgroundColor: theme.secondaryAccent },
          ]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings" size={20} color={theme.textOnAccent} />
        </TouchableOpacity>
        <Text style={[styles.poem, { color: theme.text }]}>{randomPoem}</Text>
        <View>
          <View style={styles.dropdownWrapper}>
            <TouchableOpacity
              style={styles.reloadButton}
              onPress={generateRandomPoem}
            >
              <Ionicons name="reload" size={24} color={theme.accent} />
            </TouchableOpacity>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={language}
                onValueChange={(itemValue) => setLanguage(itemValue)}
                style={[styles.picker, { color: theme.text }]}
              >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Urdu" value="Urdu" />
                <Picker.Item label="Roman Urdu/Hindi" value="Roman Urdu" />
              </Picker>
            </View>
          </View>
        </View>
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
            style={[styles.navButton, { backgroundColor: theme.accent }]}
            onPress={() => navigation.navigate("Share", { verse: randomPoem })}
          >
            <Text style={[styles.navButtonText, { color: theme.textOnAccent }]}>
              Share
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
  dropdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  dropdownLabel: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: "bold",
  },
  dropdownContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    overflow: "hidden",
    marginLeft: 10,
  },
  picker: {
    height: 30,
    width: 100,
    paddingHorizontal: 10,
    borderWidth: 0,
    color: "#000",
  },
  poem: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontStyle: "italic",
  },
  reloadButton: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginRight: 10,
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
  settingsButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ccc",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
