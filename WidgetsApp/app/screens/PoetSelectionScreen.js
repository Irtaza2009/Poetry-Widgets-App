import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import poets from '../data/poets.json';

export default function PoetSelectionScreen() {
    const [selectedPoets, setSelectedPoets] = useState([]);

    const togglePoetSelection = (poet) => {
        setSelectedPoets((prev) =>
            prev.includes(poet) ? prev.filter((p) => p !== poet) : [...prev, poet]
        );
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={poets}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            marginVertical: 5,
                            backgroundColor: selectedPoets.includes(item.name)
                                ? 'lightblue'
                                : 'white',
                        }}
                        onPress={() => togglePoetSelection(item.name)}
                    >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}