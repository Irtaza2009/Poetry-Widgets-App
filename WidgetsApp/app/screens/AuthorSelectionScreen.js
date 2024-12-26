import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import quotes from '../data/quotes.json';
import { colors } from '../styles/theme';

export default function AuthorSelectionScreen() {
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    useEffect(() => {
        const loadSelectedAuthors = async () => {
            const storedAuthors = await AsyncStorage.getItem('selectedAuthors');
            if (storedAuthors) setSelectedAuthors(JSON.parse(storedAuthors));
        };
        loadSelectedAuthors();
    }, []);

    const toggleAuthorSelection = async (author) => {
        const updatedAuthors = selectedAuthors.includes(author)
            ? selectedAuthors.filter((a) => a !== author)
            : [...selectedAuthors, author];
        
        setSelectedAuthors(updatedAuthors);
        await AsyncStorage.setItem('selectedAuthors', JSON.stringify(updatedAuthors));
    };

    const clearSelection = async () => {
        setSelectedAuthors([]);
        await AsyncStorage.removeItem('selectedAuthors');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Favorite Authors</Text>
            <FlatList
                data={quotes}
                keyExtractor={(item) => item.author}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selectedAuthors.includes(item.author) && styles.buttonSelected,
                        ]}
                        onPress={() => toggleAuthorSelection(item.author)}
                    >
                        <Text style={styles.buttonText}>{item.author}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button title="Clear Selection" onPress={clearSelection} />
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: colors.buttonBackground,
        borderWidth: 1,
        borderColor: colors.secondary,
    },
    buttonSelected: {
        backgroundColor: colors.buttonSelected,
    },
    buttonText: {
        fontSize: 16,
        color: colors.text,
        textAlign: 'center',
    },
});