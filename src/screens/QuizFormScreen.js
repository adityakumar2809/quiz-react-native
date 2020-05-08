import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation'
import {Picker} from '@react-native-community/picker';

import Spacer from '../components/Spacer';
import {Context as RequestContext} from '../context/RequestContext';
import {Context as QuestionContext} from '../context/QuestionContext';

const QuizFormScreen = () => {


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
                    {
                        isLoading
                        ?   <Button
                                title="Loading button"
                                loading={true}
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
                                /> 
                    }
                </Spacer>
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default QuizFormScreen;