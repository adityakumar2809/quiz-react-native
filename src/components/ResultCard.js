import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import Spacer from './Spacer';

const ResultCard = ( {question, answer, response, status} ) => {
    return(
        <View>
            <View>
                <Text style={styles.borderStyle}>{decodeURIComponent(question)}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{...styles.borderStyle, flex:2}}>
                    <Text style={styles.labelStyle}>Correct Answer</Text>
                    <Text>{decodeURIComponent(answer)}</Text>
                </View>
                <View style={{...styles.borderStyle, flex:2}}>
                    <Text style={styles.labelStyle}>Your Response</Text>
                    <Text>{decodeURIComponent(response)}</Text>
                </View>
                <View style={{...styles.borderStyle, flex:1, justifyContent:'center'}}>
                    <Text>{
                            status == 1
                            ?<FontAwesome name='check' size={20} style={{color: 'green'}}/>
                            : status == -1
                              ? <FontAwesome name='close' size={20} style={{color: 'red'}}/>
                              : status == 2
                                ? <FontAwesome name='minus' size={20} style={{color: 'gray'}} />
                                : <FontAwesome name='circle-o' size={20} style={{color: 'orange'}} />
                        }
                    </Text>
                </View>
            </View>
            <Spacer/>
        </View>
    );
};

const styles = StyleSheet.create({
    borderStyle: {
        borderColor: 'black',
        borderWidth: 2,
        padding: 5,
        alignItems:'center', 
        flexDirection: 'column'
    },
    labelStyle: {
        fontWeight:'bold', 
        fontStyle:'italic'
    }
});

export default ResultCard;