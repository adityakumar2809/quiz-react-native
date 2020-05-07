import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';

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
                <Dropdown
                    label="Choose Difficulty"
                    data={difficulty_data}
                    onChangeText={(value) => { setSelectedOptions(value, category) }}
                />
                <Spacer/>
                <Dropdown
                    label="Choose Category"
                    data={category_data}
                    onChangeText={(value) => { setSelectedOptions(difficulty, value) }}
                />
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