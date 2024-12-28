
# Toast Notification Library for React Native

A customizable and lightweight toast notification library for React Native. This component supports animations, themes, dynamic positioning, and allows for multiple simultaneous toast notifications.

## Features
- **Custom Themes**: Built-in themes (`success`, `error`, `info`, `warning`).
- **Dynamic Positioning**: Supports vertical and horizontal positioning (`top`, `center`, `bottom`, `left`, `right`).
- **Smooth Animations**: Toasts appear and disappear with customizable animations.
- **Multi-Instance Support**: Display multiple toasts without overlap.
- **Custom Icons and Styling**: Add custom icons and override styles.

---

## Installation

1. Install the library dependencies:

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-vector-icons
```

2. Configure React Native Reanimated in your `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'], // This must be at the end
};
```

3. For iOS, ensure `pod install` is run inside the `ios` directory:

```bash
cd ios && pod install
```

---

## Usage

### Import the Toast Component
```javascript
import Toast from './Toast'; // Adjust the path based on your file structure
```

### Example Code
Here's a sample implementation to demonstrate the Toast component:

```javascript
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from './Toast';

const ToastTest = () => {
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

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          visible={true}
          onDismiss={(id) => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))}
          title={toast.title}
          message={toast.message}
          theme={toast.theme}
          icon={({ color }) => <MaterialIcons name="info" size={20} color={color} />}
          closeIcon={({ color }) => <MaterialIcons name="close" size={20} color={color} />}
          timeout={3000}
          verticalPosition="top"
          horizontalPosition="center"
        />
      ))}
    </View>
  );
};

export default ToastTest;
```

---

## Props

| Prop Name           | Type                                | Default       | Description                                                                 |
|---------------------|-------------------------------------|---------------|-----------------------------------------------------------------------------|
| `visible`           | `boolean`                          | `false`       | Controls the visibility of the toast.                                       |
| `onDismiss`         | `(id: number) => void`             | `undefined`   | Callback when the toast is dismissed.                                       |
| `title`             | `string`                           | `""`          | Title text of the toast.                                                    |
| `titleColor`        | `string`                           | `blue`        | Color of the title text.                                                    |
| `titleSize`         | `number`                           | `16`          | Font size of the title text.                                                |
| `message`           | `string`                           | `""`          | Message text of the toast.                                                  |
| `messageColor`      | `string`                           | `black`       | Color of the message text.                                                  |
| `messageSize`       | `number`                           | `14`          | Font size of the message text.                                              |
| `maxMessageLength`  | `number`                           | `100`         | Maximum length of the message before truncating with `...`.                 |
| `backgroundColor`   | `string`                           | `white`       | Background color of the toast.                                              |
| `icon`              | `React.ComponentType<{ color: string }>` | `undefined`   | Custom component for the icon.                                              |
| `iconColor`         | `string`                           | `black`       | Color of the icon.                                                          |
| `closeIcon`         | `React.ComponentType<{ color: string }>` | `undefined`   | Custom component for the close icon.                                        |
| `close`             | `boolean`                          | `true`        | Whether the close button is shown.                                          |
| `timeout`           | `number`                           | `3000`        | Duration (in ms) before the toast automatically disappears.                 |
| `verticalPosition`  | `'top' | 'center' | 'bottom'`      | `'bottom'`   | Vertical position of the toast.                                             |
| `horizontalPosition`| `'left' | 'center' | 'right'`      | `'center'`    | Horizontal position of the toast.                                           |
| `direction`         | `'top' | 'bottom' | 'left' | 'right'` | `'bottom'`   | Direction of entry/exit animation.                                          |
| `theme`             | `'success' | 'error' | 'info' | 'warning'` | `undefined`   | Predefined theme for the toast.                                             |
| `animationDuration` | `number`                           | `300`         | Duration (in ms) of the entry and exit animations.                          |
| `containerStyle`    | `StyleProp<ViewStyle>`             | `undefined`   | Custom styles for the toast container.                                      |
| `onShow`            | `(id: number) => void`             | `undefined`   | Callback when the toast is shown.                                           |
| `onHide`            | `(id: number) => void`             | `undefined`   | Callback when the toast is hidden.                                          |

---

## License

This library is open-source and licensed under the MIT License.
