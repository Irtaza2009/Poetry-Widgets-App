import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Slider from "@react-native-community/slider";
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../styles/theme';

export default function ShareScreen({ route }) {
    const { verse } = route.params;
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [fontStyle, setFontStyle] = useState("Roboto");
    const [darkMode, setDarkMode] = useState(false); // Simulating dark mode toggle

    const viewShotRef = React.createRef();

    const shareVerse = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(uri, {
                    dialogTitle: 'Share Poetry',
                });
            } else {
                alert("Sharing is not available on this device");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const theme = darkMode ? colors.dark : colors.light;

    return (
        <LinearGradient colors={theme.gradient} style={styles.gradient}>
            <ScrollView contentContainerStyle={styles.container}>
                <ViewShot ref={viewShotRef} style={[styles.verseContainer, { backgroundColor }]}>
                    <Text style={[styles.verse, { color: textColor, fontFamily: fontStyle }]}>{verse}</Text>
                </ViewShot>

                <View style={styles.controls}>
                    <Text style={[styles.label, { color: theme.text }]}>Background Color</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        step={0.1}
                        onValueChange={value => setBackgroundColor(`rgba(${value * 255}, ${value * 255}, ${value * 255}, 1)`)}
                    />

                    <Text style={[styles.label, { color: theme.text }]}>Text Color</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        step={0.1}
                        onValueChange={value => setTextColor(`rgba(${value * 255}, ${value * 255}, ${value * 255}, 1)`)}
                    />

                    <Text style={[styles.label, { color: theme.text }]}>Font Style</Text>
                    <View style={styles.buttonContainer}>
                        {["Roboto", "Cursive", "Monospace"].map((font) => (
                            <TouchableOpacity
                                key={font}
                                style={[
                                    styles.fontButton,
                                    fontStyle === font && { borderColor: theme.accent, borderWidth: 2 },
                                ]}
                                onPress={() => setFontStyle(font)}
                            >
                                <Text style={{ fontFamily: font, color: theme.text }}>{font}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.shareButton, { backgroundColor: theme.accent }]}
                    onPress={shareVerse}
                >
                    <Text style={[styles.shareButtonText, { color: theme.textOnAccent }]}>Share</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
    },
    controls: {
        width: "100%",
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
    },
    slider: {
        width: "100%",
        height: 40,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    fontButton: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    verseContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    verse: {
        fontSize: 24,
        textAlign: "center",
    },
    shareButton: {
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginTop: 20,
    },
    shareButtonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
