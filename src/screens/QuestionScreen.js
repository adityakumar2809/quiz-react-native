import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import { Context as QuestionContext } from '../context/QuestionContext';

const QuestionScreen = () => {

    const { state } = useContext(QuestionContext);


    return (
        <View>
            <Text h3>Question Screen</Text>
            <Text>{state.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default QuestionScreen;