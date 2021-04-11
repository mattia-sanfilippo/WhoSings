import Toast from 'react-native-toast-message';
const feedbackPresenter = (
  type: 'success' | 'error' | 'info',
  title: string,
  message: string,
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};

export default feedbackPresenter;
