import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation'
import {Picker} from '@react-native-community/picker';

import Spacer from '../components/Spacer';
import {Context as RequestContext} from '../context/RequestContext';
import {Context as QuestionContext} from '../context/QuestionContext';

const QuizFormScreen = ({navigation}) => {

    const err = navigation.getParam('err')

    const { 
        state: { 
            difficulty_data, 
            category_data, 
            selected_options: { 
                difficulty, 
                category 
            }
        }, 
        setSelectedOptions 
    } = useContext(RequestContext);

    const { getQuestions } = useContext(QuestionContext); 

    const [isLoading, setIsLoading] = useState(false);


    return (
        <SafeAreaView>
            <Spacer>
                <Text h4>Choose wisely</Text>
                <Spacer>
                <Picker 
                    selectedValue={difficulty ? difficulty : null}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedOptions(itemValue, category);
                    }}
                >
                    <Picker.Item label="---- Select Difficulty ----" value={null} key="select_difficulty"/>
                    { difficulty_data.map((difficulty_object) => <Picker.Item label={difficulty_object.label} value={difficulty_object.value} key={difficulty_object.value} />) }
                </Picker>
                <Spacer/>
                <Picker 
                    selectedValue={category ? category : null}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedOptions(difficulty, itemValue);
                    }}
                >
                    <Picker.Item label="---- Select Category ----" value={null} key="select_category"/>
                    { category_data.map((category_object) => <Picker.Item label={category_object.label} value={category_object.value} key={category_object.value} />) }
                </Picker>
                </Spacer>
                <Spacer>
                    {err ? <Text style={{color:'red'}}>{err}</Text>: null}
                </Spacer>
                <Spacer>
                    {
                        isLoading
                        ?   <Button
                                title="Loading button"
                                loading={true}
                                buttonStyle={styles.buttonStyle}
                            /> 
                        :   !category || !difficulty 
                            ?   <Button 
                                    title='Submit'
                                    disabled={true}
                                />
                            :   <Button 
                                    title='Submit'
                                    onPress={()=>{
                                        setIsLoading(true);
                                        getQuestions(difficulty, category, (status)=>{setIsLoading(status)});
                                    }}
                                    buttonStyle={styles.buttonStyle}
                                /> 
                    }
                </Spacer>
                <Spacer>
                    <Text style={{fontWeight: 'bold'}}>Instructions</Text>
                    <Text style={{marginBottom:5}}>1. You would get 10 questions in the quiz</Text>
                    <Text style={{marginBottom:5}}>2. Time Limit for Easy, Meduim and Difficult mode are 30, 45, 60 seconds respectively</Text>
                    <Text style={{marginBottom:5}}>3. Correct Answers gives +1, Wrong Answers give -1 and skipped questions give 0 to your score</Text>
                </Spacer>
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#30C39E'
    }
});

export default QuizFormScreen;