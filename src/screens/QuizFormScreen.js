import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';

import Spacer from '../components/Spacer';
import triviaApi from '../api/trivia';

const QuizFormScreen = () => {

    let difficulty_data = [{
        label: 'Easy',
        value: 'easy'
    }, {
        label: 'Medium',
        value: 'medium'
    }, {
        label: 'Hard',
        value: 'hard'
    }];

    let category_data = [{
        label: 'Animals',
        value: 27
    }, {
        label: 'Art',
        value: 25
    }, {
        label: 'General Knowledge',
        value: 9
    }, {
        label: 'Entertainment: Books',
        value: 10
    }, {
        label: 'Entertainment: Film',
        value: 11
    }, {
        label: 'Entertainment: Music',
        value: 12
    }, {
        label: 'Entertainment: Musicals & Theatres',
        value: 13
    }, {
        label: 'Entertainment: Television',
        value: 14
    }, {
        label: 'Entertainment: Video Games',
        value: 15
    }, {
        label: 'Entertainment: Board Games',
        value: 16
    }, {
        label: 'Entertainment: Japanese Anime and Manga',
        value: 31
    }, {
        label: 'Entertainment: Cartoon & Animations',
        value: 32
    }, {
        label: 'Science & Nature',
        value: 17
    }, {
        label: 'Science: Computers',
        value: 18
    }]

    const [data, setData] = useState({ difficulty: null, category: null });
    const [isLoading, setIsLoading] = useState(false);

    const getQuestions = async () => {
        const response = await triviaApi.get('/api.php', { 
            params: {
                amount: '10', 
                category: data.category, 
                difficulty: data.difficulty, 
                type: 'multiple'
            }});
        console.log(response.data);
        setIsLoading(false);
    };

    return (
        <SafeAreaView>
            <Spacer>
                <Text h3>Quiz Form Screen</Text>
                <Dropdown
                    label="Choose Difficulty"
                    data={difficulty_data}
                    onChangeText={(value) => { setData({ ...data, difficulty: value }) }}
                />
                <Spacer/>
                <Dropdown
                    label="Choose Category"
                    data={category_data}
                    onChangeText={(value) => { setData({ ...data, category: value }) }}
                />
                <Spacer>
                    {
                        isLoading
                        ?   <Button
                                title="Loading button"
                                loading={true}
                            /> 
                        :   !data.category || !data.difficulty 
                            ?   <Button 
                                    title='Submit'
                                    disabled={true}
                                />
                            :   <Button 
                                    title='Submit'
                                    onPress={()=>{
                                        setIsLoading(true);
                                        getQuestions();
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