import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Picker,
} from "react-native";
import { colors } from "../styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localize from "expo-localization";
import I18n from "../i18n";

export default function SettingsScreen({ navigation }) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState("en");

  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await AsyncStorage.setItem("darkMode", newValue.toString(newValue));
  };

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem(
      "notificationsEnabled",
      newValue.toString(newValue)
    );
  };

  const changeLanguage = async (language) => {
    setSelectedLanguage(language);
    I18n.locale = language;
    await AsyncStorage.setItem("selectedLanguage", language);
  };

  React.useEffect(() => {
    const loadSettings = async () => {
      const storedDarkMode = await AsyncStorage.getItem("darkMode");
      if (storedDarkMode !== null) setDarkMode(JSON.parse(storedDarkMode));

      const storedNotifications = await AsyncStorage.getItem(
        "notificationsEnabled"
      );
      if (storedNotifications !== null)
        setNotificationsEnabled(JSON.parse(storedNotifications));

      const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
        //I18n.locale = storedLanguage;
      }
      I18n.locale = storedLanguage || Localize.locale || "en";
    };
    loadSettings();
  }, []);

  const theme = darkMode ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {I18n.t("settings")}
      </Text>

      {/* Dark Mode */}
      <View style={styles.settingItem}>
        <Text style={styles.settingTitle}>{I18n.t("darkMode")}</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: theme.lightGray, true: theme.accent }}
          thumbColor={darkMode ? theme.accent : theme.background}
        />
      </View>

      {/* Notifications */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.text }]}>
          {I18n.t("notifications")}
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: theme.lightGray, true: theme.accent }}
          thumbColor={notificationsEnabled ? theme.accent : theme.background}
        />
      </View>

      {/* Language Selection */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.text }]}>
          {I18n.t("language")}
        </Text>
        <Picker
          selectedValue={selectedLanguage}
          style={{ height: 50, width: 150, color: theme.text }}
          onValueChange={changeLanguage}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="اردو" value="ur" />
          <Picker.Item label="हिंदी" value="hi" />
        </Picker>
      </View>

      <TouchableOpacity
        style={[
          styles.backButton,
          { backgroundColor: theme.accent },
          { color: theme.textOnAccent },
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{I18n.t("back")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
  },
});
