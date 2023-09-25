import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { loadMatchHistory } from '../zustand/useStore';
import { Result } from './Result';

export const History = () => {
    const [matchHistory, setMatchHistory] = useState<Result[]>([]);

    useEffect(() => {
        loadMatchHistory()
            .then((history: Result[]) => {
                setMatchHistory(history);
            })
            .catch((error: any) => {
                console.error('Erro ao carregar histórico:', error);
            });
    }, []);

    const createSectionData = () => {
        const sections: {
            title: string;
            data: Result[];
        }[] = [];

        matchHistory.forEach((match) => {
            const matchDate = new Date(match.date);
            const monthYear = `${matchDate.toLocaleString('default', {
                month: 'long',
            })} ${matchDate.getFullYear()}`;

            const sectionIndex = sections.findIndex((section) => section.title === monthYear);

            if (sectionIndex === -1) {
                sections.push({
                    title: monthYear,
                    data: [match],
                });
            } else {
                sections[sectionIndex].data.push(match);
            }
        });
        return sections;
    };

    const renderItem = ({ item }: { item: Result }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.won ? 'Vitória' : 'Derrota'}</Text>
                <Text style={styles.itemText}>Data: {item.date.toLocaleDateString()}</Text>
            </View>
        );
    };

    const renderSectionHeader = ({ section }: { section: { title: string } }) => {
        return (
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SectionList
                sections={createSectionData()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 16,
    },
    itemContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 5
    },
    itemText: {
        fontSize: 16,
        marginBottom: 10,
       
    },
    sectionHeaderContainer: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    sectionHeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});
