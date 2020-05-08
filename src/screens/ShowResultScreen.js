import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { Context as GameContext } from '../context/GameContext';
import { Context as QuestionContext } from '../context/QuestionContext';
import ResultCard from '../components/ResultCard';
import Spacer from '../components/Spacer';

const ShowResultScreen = ({navigation}) => {

    const { state, cleanGameData } = useContext(GameContext);
    const QuestionContextData = useContext(QuestionContext);

    let result = [];
    let score = 0;
    let score_pos = 0;
    let score_neg = 0;

    console.log(QuestionContextData.state.length)

    for (let i = 0; i < QuestionContextData.state.length; i++) {
        if (state.responses[i] === QuestionContextData.state[i].correct_answer) {
            result = [...result, 1];
            score += 1;
            score_pos += 1;
        } else if (state.responses[i].includes('undefined')){
            result = [...result, 0];
        }else if (state.responses[i].includes('missing')){
            result = [...result, 2];
        }else {
            result = [...result, -1];
            score -= 1;
            score_neg += 1;
        }
    }

    const listHeader = () => {
        return (
            <View style={{ backgroundColor: '#FAFAFA' }}>
                <Text h3>Your Performance</Text>
                <Spacer />
                <Text h4>Score: {score}/{QuestionContextData.state.length}</Text>
                <Text style={{fontWeight:'bold'}}>(Correct Answers -> {score_pos} : Incorrect Answers -> {score_neg})</Text>
                <Spacer />
            </View>
        );
    }

    const listFooter = () => {
        return (
            <Spacer>
                <Button 
                    title='Play Again'
                    onPress={() => {
                        cleanGameData();
                        navigation.navigate('QuizForm');
                    }}
                />
            </Spacer>
        );
    }


    return (
        <View>
            <Spacer>
                <FlatList
                    data={QuestionContextData.state}
                    keyExtractor={(item) => item.correct_answer}
                    renderItem={({ item, index }) => {
                        return (
                            <ResultCard
                                question={item.question}
                                answer={item.correct_answer}
                                response={state.responses[index].includes('undefined')?'---Skipped---':state.responses[index].includes('missing')?'---Missing---':state.responses[index]}
                                status={result[index]}
                            />
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={listHeader}
                    stickyHeaderIndices={[0]}
                    ListFooterComponent={listFooter}
                />
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ShowResultScreen;