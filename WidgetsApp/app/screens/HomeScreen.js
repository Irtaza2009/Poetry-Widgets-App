import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Import icon library
import verses from '../data/poets.json'; // Update JSON import
import { colors } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
    const [selectedPoets, setSelectedPoets] = useState([]);
    const [randomPoem, setRandomPoem] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const loadSelectedPoets = async () => {
                const storedPoets = await AsyncStorage.getItem('selectedPoets');
                if (storedPoets) setSelectedPoets(JSON.parse(storedPoets));
                else setSelectedPoets([]);
            };
            loadSelectedPoets();
        }, [])
    );

    useEffect(() => {
        generateRandomPoem();
    }, [selectedPoets]);

    const generateRandomPoem = () => {
        if (selectedPoets.length === 0) {
            setRandomPoem('No poets selected. Please choose from the list.');
            return;
        }

        const poet = selectedPoets[Math.floor(Math.random() * selectedPoets.length)];
        const poetPoems = verses.find((p) => p.name === poet)?.verses || [];
        const poem = poetPoems[Math.floor(Math.random() * poetPoems.length)] || '';
        setRandomPoem(poem + '\n\n- ' + poet);
    };

    return (
        <LinearGradient
            colors={['#A8DADC', '#F8F4F9']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <Text style={styles.poem}>{randomPoem}</Text>
                <TouchableOpacity
                    style={styles.reloadButton}
                    onPress={generateRandomPoem}
                >
                    <Ionicons name="reload" size={24} color={colors.accent} />
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() => navigation.navigate('Poet Selection')}
                    >
                        <Text style={styles.navButtonText}>Select Poets</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    poem: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.text,
        marginBottom: 10, // Adjust margin for spacing with the reload button
        fontStyle: 'italic',
    },
    reloadButton: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    navButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: colors.accent,
    },
    navButtonText: {
        fontSize: 16,
        color: colors.textOnAccent,
    },
});
