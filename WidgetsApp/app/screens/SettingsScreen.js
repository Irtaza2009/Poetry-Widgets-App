import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity} from "react-native";
import {colors} from '../styles/theme';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({navigation}) {
    const [darkMode, setDarkMode] = React.useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    
    const toggleDarkMode = async () => {
        const newValue = !darkMode;
        setDarkMode(newValue);
        await AsyncStorage.setItem('darkMode', newValue.toString(newValue));
    };

    const toggleNotifications = async () => {
        const newValue = !notificationsEnabled;
        setNotificationsEnabled(newValue);
        await AsyncStorage.setItem('notificationsEnabled', newValue.toString(newValue));
    }
    
    React.useEffect(() => {
        const loadSettings = async () => {
            const storedDarkMode = await AsyncStorage.getItem('darkMode');
            if (storedDarkMode !== null) setDarkMode(JSON.parse(storedDarkMode));

            const storedNotifications = await AsyncStorage.getItem('notificationsEnabled');
            if (storedNotifications !== null) setNotificationsEnabled(JSON.parse(storedNotifications));
        };
        loadSettings();
    }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            {/* Dark Mode */}
            <View style={styles.settingItem}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Switch
                    value={darkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{false: colors.lightGray, true: colors.accent}}
                    thumbColor={darkMode ? colors.accent : colors.background}
                />
            </View>

            {/* Notifications */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={toggleNotifications}
                    trackColor={{false: colors.lightGray, true: colors.accent}}
                    thumbColor={notificationsEnabled ? colors.accent : colors.background}
                />
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
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
        color: colors.text,
    },
    backButton: {
        marginTop: 30,
        padding: 15,
        backgroundColor: colors.accent,
        borderRadius: 5,
        alignItems: "center",
    },
    backButtonText: {
        fontSize: 16,
        color: colors.textOnAccent,
    },
});