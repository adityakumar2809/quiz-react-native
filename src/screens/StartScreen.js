import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import Spacer from '../components/Spacer';
import { Context as GameContext } from '../context/GameContext';

const StartScreen = ({ navigation }) => {

    const { cleanGameData } = useContext(GameContext);

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <Spacer>
                <Button 
                    title="Start a new game" 
                    onPress={() => {
                        cleanGameData();
                        navigation.navigate('QuizForm');
                    }}    
                />
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default StartScreen;