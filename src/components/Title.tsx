import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
});

const Title = (props: {title: string}) => {
  return (
    <Text category="h1" style={styles.title}>
      {props.title}
    </Text>
  );
};

export default Title;
