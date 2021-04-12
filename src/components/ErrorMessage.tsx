import {Button, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  button: {
    margin: 10,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ErrorMessage = (props: {
  message: string;
  buttonMessage: string;
  onPressButton: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Text category="h1" style={styles.title}>
        {props.message}
      </Text>
      <Button style={styles.button} onPress={props.onPressButton}>
        {props.buttonMessage}
      </Button>
    </View>
  );
};

export default ErrorMessage;
