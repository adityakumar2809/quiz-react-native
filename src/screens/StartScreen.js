import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import Spacer from '../components/Spacer';
import { Context as GameContext } from '../context/GameContext';

const StartScreen = ({ navigation }) => {

    const { cleanGameData } = useContext(GameContext);

    return (
        <SafeAreaView forceInset={{top: 'always'}} style={styles.containerStyle}>
            <Spacer>
                <Button 
                    title="Start a new game" 
                    onPress={() => {
                        cleanGameData();
                        navigation.navigate('QuizForm', null);
                    }}    
                    buttonStyle={styles.buttonStyle}
                />
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1, 
        justifyContent: 'center'
    },
    buttonStyle: {
        marginBottom: 200,
        backgroundColor: '#30C39E'
    }
});

export default StartScreen;