import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = ({ children }) => {
    return (
        <View style={styles.containerStyle}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        margin: 15
    }
});

export default Spacer;