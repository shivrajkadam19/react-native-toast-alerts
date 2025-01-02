import React, { useState } from "react";
import { View, Button, ScrollView, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "@shivrajkadam/react-native-toast-alerts"; // Adjust the path based on your setup

const App = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message, theme) => {
    const id = Date.now(); // Unique toast ID
    setToasts((prevToasts) => [...prevToasts, { id, title, message, theme }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title="Show Success Toast"
        onPress={() =>
          showToast("Success", "This is a success message!", "success")
        }
      />
      <Button
        title="Show Error Toast"
        onPress={() =>
          showToast("Error", "Something went wrong!", "error")
        }
      />
      <Button
        title="Show Info Toast"
        onPress={() =>
          showToast("Info", "This is an info message!", "info")
        }
      />
      <Button
        title="Show Warning Toast"
        onPress={() =>
          showToast("Warning", "Be cautious about this!", "warning")
        }
      />
      <Button
        title="Show Custom Theme Toast"
        onPress={() =>
          showToast(
            "Custom",
            "This is a custom theme toast!",
            undefined // No predefined theme
          )
        }
      />

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          visible={true}
          onDismiss={(id) =>
            setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
          }
          title={toast.title}
          message={toast.message}
          theme={toast.theme}
          icon={({ color }) => <MaterialIcons name="info" size={20} color={color} />}
          closeIcon={({ color }) => (
            <MaterialIcons name="close" size={20} color={color} />
          )}
          timeout={3000}
          verticalPosition="bottom"
          horizontalPosition="center"
          direction="right"
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default App;
