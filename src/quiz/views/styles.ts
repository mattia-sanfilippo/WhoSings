import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  mainCard: {
    margin: 8,
    height: 128,
    justifyContent: 'center',
    borderRadius: 25,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizCard: {
    margin: 8,
  },
  quizContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  timer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 8,
  },
  startButton: {
    margin: 10,
  },
  image: {
    width: 128,
    height: 128,
    alignSelf: 'center',
  },
});
