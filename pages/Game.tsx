import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackTypes } from '../App';
import { loadMatchHistory, saveMatchHistory } from '../zustand/useStore';

export type YourNavigationParamList = {
    History: undefined;
};

export const dices = [
    { id: 1, image: require('../assets/dice1.jpg') },
    { id: 2, image: require('../assets/dice2.jpg') },
    { id: 3, image: require('../assets/dice3.jpg') },
    { id: 4, image: require('../assets/dice4.jpg') },
    { id: 5, image: require('../assets/dice5.jpg') },
    { id: 6, image: require('../assets/dice6.jpg') },
];

const Game = () => {
    const [result, setResult] = useState<string | null>(null);
    const [point, setPoint] = useState<number | null>(null);
    const [diceOne, setDiceOne] = useState<number>();
    const [diceTwo, setDiceTwo] = useState<number>();
    const [matchHistory, setMatchHistory] = useState<{ date: string; won: boolean }[]>([]);
    const navigation = useNavigation<StackTypes>();

    useEffect(() => {
        loadMatchHistory()
            .then((history) => {
                setMatchHistory(history);
            })
            .catch((error) => {
                console.error('Erro ao carregar histórico:', error);
            });
    }, []);

    const playGame = () => {
        const playDiceOne = Math.floor(Math.random() * 6);
        const playDiceTwo = Math.floor(Math.random() * 6);

        const diceOneValue = dices[playDiceOne].id;
        const diceTwoValue = dices[playDiceTwo].id;

        setDiceOne(diceOneValue);
        setDiceTwo(diceTwoValue);

        const sumDices = diceOneValue + diceTwoValue;

        if (sumDices >= 7 && sumDices <= 11) {
            setPoint(sumDices);
            setResult(`Você ganhou! Sua pontuação total foi de ${sumDices}`);
        } else {
            setPoint(sumDices);
            setResult(`Você perdeu! Sua pontuação total foi de ${sumDices}`);
        }
    
        
        const newMatch = { date: new Date().toISOString(), won: sumDices >= 7 && sumDices <= 11 };
        const updatedHistory = [...matchHistory, newMatch];
        setMatchHistory(updatedHistory);
        saveMatchHistory(updatedHistory);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, marginBottom: 10, marginTop: 30 }}>Jogo de Dados</Text>

                    {diceOne && diceTwo && (
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Image
                                source={dices.find((dice) => dice.id === diceOne)?.image}
                                style={{ width: 100, height: 100, marginRight: 20 }}
                            />
                            <Image
                                source={dices.find((dice) => dice.id === diceTwo)?.image}
                                style={{ width: 100, height: 100, marginRight: 20 }}
                            />
                        </View>
                    )}
                    <TouchableOpacity onPress={playGame} style={{ padding: 10, backgroundColor: 'pink', borderRadius: 5, marginTop: 20 }}>
                        <Text style={{ color: 'black', fontSize: 18 }}>Jogar</Text>
                    </TouchableOpacity>

                    {result && (
                        <Text style={{ fontSize: 18, marginTop: 15 }}>{result}</Text>
                    )}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('History')}
                        style={{ padding: 10, backgroundColor: 'pink', borderRadius: 5, marginTop: 20 }}
                    >
                        <Text style={{ color: 'black', fontSize: 18 }}>Ver Histórico</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Game;
