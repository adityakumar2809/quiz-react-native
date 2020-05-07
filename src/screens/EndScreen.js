import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import Spacer from '../components/Spacer';

const EndScreen = ({ navigation }) => {
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Spacer>
                <Button
                    title="See Results"
                    onPress={() => { navigation.navigate('ShowResult') }}
                />
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default EndScreen;