import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, CheckBox, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import { Context as QuestionContext } from '../context/QuestionContext';
import { Context as GameContext } from '../context/GameContext';
import { Context as RequestContext } from '../context/RequestContext';
import Spacer from '../components/Spacer';

const QuestionScreen = ({ navigation }) => {

    const QuestionContextData = useContext(QuestionContext);
    const { setTimer, startTimer, stopTimer, cleanGameData, getNextQuestion, updateResponses, gameTimeOut, state } = useContext(GameContext);
    const { state: {selected_options: { difficulty }} } = useContext(RequestContext);

    const [checkBox, setCheckBox] = useState([false, false, false, false]);
    const [flag, setFlag] = useState(0);


    useEffect(() => {
        if (flag!=1) {
            setFlag(1);
        }
        switch(difficulty){
            case 'easy':
                setTimer(10);
                break;
            case 'medium':
                setTimer(45);
                break;
            case 'hard':
                setTimer(60);
                break;
            default:
                cleanGameData();
                navigation.navigate('QuestionForm')
        }
        startTimer();
        getNextQuestion(QuestionContextData.state, state.index);
    },[])


    if(state.timer == 0 && flag == 1){
        gameTimeOut(QuestionContextData.state.length, (f) => {setFlag(f)}); 
    }


    return (
        <SafeAreaView forceInset={{top:'always'}}>
            <Spacer>
                <Text style={{fontWeight:'bold', marginBottom: 5}}>
                    Time Left => 00:{state.timer>9 ? `${state.timer}` : `0${state.timer}`}
                </Text>
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
                                    (JSON.stringify(arr) == JSON.stringify(checkBox))
                                    ?   setCheckBox([false, false, false, false])
                                    :   setCheckBox(arr)
                                    
                                }}
                            />    
                        );
                    }}
                />
                <View>
                    <Spacer>
                        { 
                            state.index == QuestionContextData.state.length - 1
                            ?   checkBox.indexOf(true) == -1
                                ?   <Button 
                                        title="Submit"
                                        disabled={true}
                                    />
                                :   <Button 
                                        title="Submit"
                                        onPress={() => { 
                                            updateResponses(state.index, checkBox.indexOf(true));
                                            setCheckBox([false, false, false, false]);
                                            stopTimer();
                                            navigation.navigate('End');
                                        }}
                                    />

                            :   checkBox.indexOf(true) == -1
                                ?   <Button 
                                        title="Next"
                                        disabled={true}
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
                    <Spacer>
                        {
                            state.index == QuestionContextData.state.length - 1
                            ?  <Button 
                                    title="Skip & Submit"
                                    onPress={() => {
                                        updateResponses(state.index, -1);
                                        setCheckBox([false, false, false, false]);
                                        stopTimer();
                                        navigation.navigate('End'); 
                                    }}
                                />
                            :   <Button 
                                    title="Skip"
                                    onPress={() => {
                                        updateResponses(state.index, -1);
                                        setCheckBox([false, false, false, false]);
                                        getNextQuestion(QuestionContextData.state, state.index); 
                                    }}
                                />
                        }
                    </Spacer>
                    <Spacer>
                        <Button 
                            title='Restart'
                            onPress={() => {
                                cleanGameData();
                                navigation.navigate('QuizForm');
                            }}
                        />
                    </Spacer>
                </View>
            </Spacer>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({});

export default QuestionScreen;