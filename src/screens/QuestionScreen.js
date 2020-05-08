import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, CheckBox, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import { Context as QuestionContext } from '../context/QuestionContext';
import { Context as GameContext } from '../context/GameContext';
import Spacer from '../components/Spacer';

const QuestionScreen = ({ navigation }) => {

    const QuestionContextData = useContext(QuestionContext);
    const { getNextQuestion, updateResponses, state } = useContext(GameContext);

    const [checkBox, setCheckBox] = useState([false, false, false, false]);

    useEffect(() => {
        getNextQuestion(QuestionContextData.state, state.index);
    },[])


    return (
        <SafeAreaView forceInset={{top:'always'}}>
            <Spacer>
                <Text h4>Question {state.index + 1}</Text>
                <Spacer>
                    <Text>{decodeURIComponent(state.question)}</Text>
                </Spacer>
                <FlatList 
                    data={state.options}
                    keyExtractor={(item) => item}
                    renderItem={({item, index}) => {
                        return(
                            <CheckBox 
                                title={decodeURIComponent(item)}
                                checked={checkBox[index]}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                onPress={() => {
                                    let arr = [false, false, false, false];
                                    arr[index] = true;
                                    setCheckBox(arr);
                                }}
                            />    
                        );
                    }}
                />
                <Spacer>
                    { 
                        state.index == QuestionContextData.state.length - 1
                        ?  <Button 
                                title="Next"
                                onPress={() => { 
                                    updateResponses(state.index, checkBox.indexOf(true));
                                    setCheckBox([false, false, false, false]);
                                    navigation.navigate('End');
                                }}
                            />
                        :   <Button 
                                title="Next"
                                onPress={() => { 
                                    updateResponses(state.index, checkBox.indexOf(true));
                                    setCheckBox([false, false, false, false]);
                                    getNextQuestion(QuestionContextData.state, state.index); 
                                }}
                            />
                    }
                </Spacer>
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default QuestionScreen;