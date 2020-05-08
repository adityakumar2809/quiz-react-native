import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import Spacer from '../components/Spacer';

const EndScreen = ({ navigation }) => {
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.containerStyle}>
            <Spacer>
                <Button
                    title="See Results"
                    onPress={() => { navigation.navigate('ShowResult') }}
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

export default EndScreen;