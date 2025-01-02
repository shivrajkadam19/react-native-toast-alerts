import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

let toastIdCounter = 0; // Unique ID generator for toasts

const { width, height } = Dimensions.get('window');

const Toast = ({
  id = toastIdCounter++, // Assign unique ID automatically
  visible,
  onDismiss,
  title = '',
  titleColor = 'blue',
  titleSize = 16,
  titleLineHeight = 20,
  message = '',
  messageColor = 'black',
  messageSize = 14,
  messageLineHeight = 18,
  maxMessageLength = 100,
  backgroundColor = 'white',
  icon: IconComponent,
  iconColor = 'black',
  closeIcon: CloseIconComponent,
  close = true,
  timeout = 3000,
  verticalPosition = 'bottom',
  horizontalPosition = 'center',
  direction = 'bottom',
  theme,
  animationDuration = 300,
  containerStyle,
  titleStyle,
  messageStyle,
  onShow,
  onHide,
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(direction === 'left' ? -width : direction === 'right' ? width : 0);
  const translateY = useSharedValue(direction === 'top' ? -height : direction === 'bottom' ? height : 0);

  useEffect(() => {
    if (visible) {
      if (onShow) onShow(id);
      opacity.value = withTiming(1, { duration: animationDuration, easing: Easing.out(Easing.exp) });
      translateX.value = withTiming(0, { duration: animationDuration, easing: Easing.out(Easing.exp) });
      translateY.value = withTiming(0, { duration: animationDuration, easing: Easing.out(Easing.exp) });

      const timer = setTimeout(() => {
        opacity.value = withTiming(0, { duration: animationDuration, easing: Easing.in(Easing.exp) });
        translateX.value = withTiming(direction === 'left' ? -width : direction === 'right' ? width : 0, {
          duration: animationDuration,
          easing: Easing.in(Easing.exp),
        });
        translateY.value = withTiming(direction === 'top' ? -height : direction === 'bottom' ? height : 0, {
          duration: animationDuration,
          easing: Easing.in(Easing.exp),
        });

        if (onDismiss) {
          setTimeout(() => onDismiss(id), animationDuration);
        }
        if (onHide) onHide(id);
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      opacity.value = withTiming(0, { duration: animationDuration, easing: Easing.in(Easing.exp) });
      translateX.value = withTiming(direction === 'left' ? -width : direction === 'right' ? width : 0, {
        duration: animationDuration,
        easing: Easing.in(Easing.exp),
      });
      translateY.value = withTiming(direction === 'top' ? -height : direction === 'bottom' ? height : 0, {
        duration: animationDuration,
        easing: Easing.in(Easing.exp),
      });
    }
  }, [visible, direction]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const themeColors = {
    success: { backgroundColor: 'green', titleColor: 'white', messageColor: 'white', iconColor: 'white' },
    error: { backgroundColor: 'red', titleColor: 'white', messageColor: 'white', iconColor: 'white' },
    warning: { backgroundColor: 'yellow', titleColor: 'black', messageColor: 'black', iconColor: 'black' },
    info: { backgroundColor: 'blue', titleColor: 'white', messageColor: 'white', iconColor: 'white' },
  };

  const appliedTheme = theme ? themeColors[theme] : {};

  const effectiveBackgroundColor = appliedTheme.backgroundColor || backgroundColor;
  const effectiveTitleColor = appliedTheme.titleColor || titleColor;
  const effectiveMessageColor = appliedTheme.messageColor || messageColor;
  const effectiveIconColor = appliedTheme.iconColor || iconColor;

  const finalContainerStyle = {
    backgroundColor: effectiveBackgroundColor,
    position: 'absolute',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 280,
    maxWidth: width * 0.8,
    ...(verticalPosition === 'top' && { top: 50 }),
    ...(verticalPosition === 'bottom' && { bottom: 50 }),
    ...(verticalPosition === 'center' && { top: (height / 2) - 50 }),
    ...(horizontalPosition === 'left' && { left: 15 }),
    ...(horizontalPosition === 'right' && { right: 15 }),
    ...(horizontalPosition === 'center' && { left: (width / 2) - 100 }),
    ...containerStyle,
  };

  const truncatedMessage =
    message.length > maxMessageLength
      ? message.substring(0, maxMessageLength) + '...'
      : message;

  return (
    <Animated.View style={[finalContainerStyle, animatedStyles]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {IconComponent && (
          <View style={{ marginRight: 10 }}>
            <IconComponent color={effectiveIconColor} />
          </View>
        )}
        <View style={{ flex: 1 }}>
          {title && (
            <Text
              style={{
                color: effectiveTitleColor,
                fontSize: titleSize,
                lineHeight: titleLineHeight,
                fontWeight: 'bold',
                flexShrink: 1,
                ...titleStyle,
              }}
            >
              {title}
            </Text>
          )}
          {truncatedMessage && (
            <Text
              style={{
                color: effectiveMessageColor,
                fontSize: messageSize,
                lineHeight: messageLineHeight,
                marginTop: 5,
                ...messageStyle,
              }}
            >
              {truncatedMessage}
            </Text>
          )}
        </View>
        {close && CloseIconComponent && (
          <TouchableOpacity onPress={() => onDismiss && onDismiss(id)} style={{ marginLeft: 10 }}>
            <CloseIconComponent color={effectiveIconColor} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default Toast;
