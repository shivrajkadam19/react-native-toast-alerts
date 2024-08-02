import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ToastModal from './ToastModal';
import Icons from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
  };

  const handleDismiss = () => {
    setToastVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Button title="Show Toast" onPress={showToast} />
      </View>
      <ToastModal
        visible={toastVisible}
        onDismiss={handleDismiss}
        title="Success"
        titleColor="black"
        titleSize={16}
        titleLineHeight={20}
        message="Thank you for your feedback. Thanks for subscribing to my YouTube channel!"
        messageColor="black"
        messageSize={14}
        messageLineHeight={18}
        backgroundColor="#ccffcc"
        position="top"
        theme="light"
        icon={() => <Icons name="info" size={20} color={"red"} />}
        closeIcon={() => <Icons name="close" size={20} color={"black"} />}
        iconColor="black"
        close={true}
        timeout={3000}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
