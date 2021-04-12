import {Text} from '@ui-kitten/components';
import React from 'react';

const Timer = (props: {counter: number}) => {
  return (
    <Text category="h6" appearance="hint">
      {props.counter}
    </Text>
  );
};

export default Timer;
