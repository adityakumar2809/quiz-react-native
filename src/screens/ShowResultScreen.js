import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-elements';

import { Context as GameContext } from '../context/GameContext';
import { Context as QuestionContext } from '../context/QuestionContext';

const ShowResultScreen = () => {

    const { state } = useContext(GameContext);
    const QuestionContextData = useContext(QuestionContext);

    let result = [];
    let score = 0;


    for (let i = 0; i < state.responses.length; i++) {
        if (state.responses[i] === QuestionContextData.state[i].correct_answer) {
            result = [...result, true];
            score += 1;
        } else {
            result = [...result, false];
        }
    }


    return (
        <View>
            <Text h3>Your Performance</Text>
            <Text>Score: {score}/{QuestionContextData.state.length}</Text>
            <Text>Question --- Correct Answer --- Your Response -- Evaluation</Text>
            <FlatList
                data={state.responses}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => {
                    return (
                        <Text>
                            {QuestionContextData.state[index].question} --- {QuestionContextData.state[index].correct_answer} --- {item} --- {result[index]?'true':'false'}
                        </Text>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default ShowResultScreen;