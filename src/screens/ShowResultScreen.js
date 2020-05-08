import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-elements';

import { Context as GameContext } from '../context/GameContext';
import { Context as QuestionContext } from '../context/QuestionContext';
import ResultCard from '../components/ResultCard';
import Spacer from '../components/Spacer';

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

    const listHeader = () => {
        return (
            <View style={{ backgroundColor: '#FAFAFA' }}>
                <Text h3>Your Performance</Text>
                <Spacer />
                <Text h4>Score: {score}/{QuestionContextData.state.length}</Text>
                <Spacer />
            </View>
        );
    }


    return (
        <View>
            <Spacer>
                <FlatList
                    data={state.responses}
                    keyExtractor={(item) => item}
                    renderItem={({ item, index }) => {
                        return (
                            <ResultCard
                                question={QuestionContextData.state[index].question}
                                answer={QuestionContextData.state[index].correct_answer}
                                response={item}
                                status={result[index]}
                            />
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={listHeader}
                    stickyHeaderIndices={[0]}
                />
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ShowResultScreen;