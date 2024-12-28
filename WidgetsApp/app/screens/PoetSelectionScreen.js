import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Button,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import verses from '../data/poets.json';
import { colors } from '../styles/theme';

export default function PoetSelectionScreen() {
    const [selectedPoets, setSelectedPoets] = useState([]);

    useEffect(() => {
        const loadSelectedPoets = async () => {
            const storedPoets = await AsyncStorage.getItem('selectedPoets');
            if (storedPoets) setSelectedPoets(JSON.parse(storedPoets));
        };
        loadSelectedPoets();
    }, []);

    const togglePoetSelection = async (poet) => {
        const updatedPoets = selectedPoets.includes(poet)
            ? selectedPoets.filter((p) => p !== poet)
            : [...selectedPoets, poet];

        setSelectedPoets(updatedPoets);
        await AsyncStorage.setItem('selectedPoets', JSON.stringify(updatedPoets));
    };

    const clearSelection = async () => {
        setSelectedPoets([]);
        await AsyncStorage.removeItem('selectedPoets');
    };

    const  poetDescriptions = {
        'Rumi': 'A Persian poet known for his spiritual wisdom.',
        'Emily Dickinson': 'An American poet with introspective works.',
        'William Wordsworth': 'A poet who captured the beauty of nature.',
        'Maya Angelou': 'An influential poet and activist.',
    };

    const getDescriptionStyle = (poet) => ({
        color: selectedPoets.includes(poet) ? colors.accent : colors.secondary,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Favorite Poets</Text>
            <FlatList
                data={verses}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selectedPoets.includes(item.name) && styles.buttonSelected,
                        ]}
                        onPress={() => togglePoetSelection(item.name)}
                    >
                        <Text style={styles.buttonText}>{item.name}</Text>
                        <Text style={[styles.description, getDescriptionStyle(item.name)]}>
                            {poetDescriptions[item.name] || 'A legendary figure.'}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <Button title="Clear Selection" onPress={clearSelection} color={colors.accent} />
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
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 8,
        padding: 15,
        borderRadius: 15,
        backgroundColor: colors.buttonBackground,
        borderWidth: 1,
        borderColor: colors.secondary,
        width: '90%',
        alignItems: 'center',
    },
    buttonSelected: {
        backgroundColor: colors.buttonSelected,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    description: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 5,
    },
});
