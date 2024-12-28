import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import poets from '../data/poets.json'; // Update JSON import
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
        const poetPoems = poets.find((p) => p.poet === poet)?.poems || [];
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
                <View style={styles.buttonContainer}>
                    <Button
                        title="Select Poets"
                        onPress={() => navigation.navigate('Poet Selection')}
                        color={colors.accent}
                    />
                    <Button
                        title="Generate New Poem"
                        onPress={generateRandomPoem}
                        color={colors.secondary}
                    />
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
        marginBottom: 30,
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
});
