import React, { useState } from 'react';
import { View, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from './ToastModal'; // Adjust the path as per your project structure

const App = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message, theme) => {
    const id = Date.now(); // Generate a unique ID
    setToasts((prevToasts) => [...prevToasts, { id, title, message, theme }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000); // Adjust timeout to match your toast duration
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Show Success Toast"
        onPress={() => showToast('Success', 'This is a success message!', 'success')}
      />
      <Button
        title="Show Error Toast"
        onPress={() => showToast('Error', 'Something went wrong!', 'error')}
      />
      <Button
        title="Show Info Toast"
        onPress={() => showToast('Info', 'Here is some information.', 'info')}
      />
      <Button
        title="Show Warning Toast"
        onPress={() => showToast('Warning', 'Be cautious!', 'warning')}
      />

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          // id={toast.id}
          visible={true}
          onDismiss={(id) => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))}
          title={toast.title}
          message={toast.message}
          theme={toast.theme}
          icon={({ color }) => <MaterialIcons name="info" size={20} color={color} />}
          closeIcon={({ color }) => <MaterialIcons name="close" size={20} color={color} />}
          timeout={3000}
          verticalPosition="bottom"
          horizontalPosition="center"
          direction="left"
        />
      ))}
    </View>
  );
};

export default App;
