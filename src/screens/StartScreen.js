import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import Spacer from '../components/Spacer';

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <Spacer>
                <Button 
                    title="Start a new game" 
                    onPress={() => navigation.navigate('QuizForm')}    
                />
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default StartScreen;