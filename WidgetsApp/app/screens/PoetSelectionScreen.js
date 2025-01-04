import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import verses from "../data/poets.json";
import { colors } from "../styles/theme";

export default function PoetSelectionScreen() {
  const [selectedPoets, setSelectedPoets] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // State for theme

  useEffect(() => {
    const loadSelectedPoets = async () => {
      const storedPoets = await AsyncStorage.getItem("selectedPoets");
      if (storedPoets) setSelectedPoets(JSON.parse(storedPoets));
      const storedTheme = await AsyncStorage.getItem("darkMode");
      if (storedTheme !== null) setDarkMode(JSON.parse(storedTheme));
    };
    loadSelectedPoets();
  }, []);

  const theme = darkMode ? colors.dark : colors.light;

  const togglePoetSelection = async (poet) => {
    const updatedPoets = selectedPoets.includes(poet)
      ? selectedPoets.filter((p) => p !== poet)
      : [...selectedPoets, poet];

    setSelectedPoets(updatedPoets);
    await AsyncStorage.setItem("selectedPoets", JSON.stringify(updatedPoets));
  };

  const clearSelection = async () => {
    setSelectedPoets([]);
    await AsyncStorage.removeItem("selectedPoets");
  };

  const poetDescriptions = {
    "Rumi": "A Persian poet known for his spiritual wisdom.",
    "Emily Dickinson": "An American poet with introspective works.",
    "William Wordsworth": "A poet who captured the beauty of nature.",
    "Maya Angelou": "An influential poet and activist.",
    "Mirza Ghalib": "A prominent Urdu and Persian poet.",
    "Allama Iqbal": "A philosopher poet and politician.",
    "Khalil Gibran": "A Lebanese-American poet and writer.",
  };

  const getDescriptionStyle = (poet) => ({
    color: selectedPoets.includes(poet) ? theme.accent : theme.secondary,
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Select Your Favorite Poets
      </Text>
      <FlatList
        data={verses}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: theme.buttonBackground},
              selectedPoets.includes(item.name) && {
                backgroundColor: theme.buttonSelected,
              },
              
            ]}
            onPress={() => togglePoetSelection(item.name)}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.description, getDescriptionStyle(item.name)]}>
              {poetDescriptions[item.name] || "A legendary figure."}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Clear Selection"
        onPress={clearSelection}
        color={theme.accent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 20,
    overflow: "scroll",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 20,
  },
  button: {
    marginVertical: 8,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 5,
  },
});
