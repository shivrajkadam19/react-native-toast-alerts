import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');

const ToastModal = ({
  visible,
  onDismiss,
  title,
  titleColor,
  titleSize,
  titleLineHeight,
  message,
  messageColor,
  messageSize,
  messageLineHeight,
  backgroundColor,
  theme,
  icon: IconComponent, // Updated prop name
  iconColor,
  closeIcon: CloseIconComponent, // New prop for close icon
  close,
  timeout,
  verticalPosition = 'bottom',
  horizontalPosition = 'center',
  direction = 'left',
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [isModalVisible, setIsModalVisible] = useState(visible);

  const startAnimations = useCallback(() => {
    opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.exp) });
    if (direction === 'left') {
      translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
    } else if (direction === 'right') {
      translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
    } else if (direction === 'top') {
      translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
    } else if (direction === 'bottom') {
      translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
    }
  }, [direction]);

  const endAnimations = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.exp) });
    if (direction === 'left') {
      translateX.value = withTiming(-width, { duration: 300, easing: Easing.in(Easing.exp) });
    } else if (direction === 'right') {
      translateX.value = withTiming(width, { duration: 300, easing: Easing.in(Easing.exp) });
    } else if (direction === 'top') {
      translateY.value = withTiming(-height, { duration: 300, easing: Easing.in(Easing.exp) });
    } else if (direction === 'bottom') {
      translateY.value = withTiming(height, { duration: 300, easing: Easing.in(Easing.exp) });
    }

    setTimeout(() => {
      setIsModalVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    }, 300); // Match duration of animation
  }, [onDismiss, direction]);

  useEffect(() => {
    if (visible) {
      setIsModalVisible(true);
      startAnimations();

      const timer = setTimeout(() => {
        endAnimations();
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      endAnimations();
    }
  }, [visible, startAnimations, endAnimations, timeout]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ],
  }), []);

  const containerStyle = {
    backgroundColor: backgroundColor || (theme === 'light' ? 'white' : 'black'),
    position: 'absolute',
    ...(verticalPosition === 'top' && { top: 50 }),
    ...(verticalPosition === 'bottom' && { bottom: 50 }),
    ...(verticalPosition === 'center' && { top: (height / 2) - 50 }), // Adjust based on toast height
    ...(horizontalPosition === 'left' && { left: 15 }),
    ...(horizontalPosition === 'right' && { right: 15 }),
    ...(horizontalPosition === 'center' && { left: (width / 2) - 150 }), // Adjust based on toast width
  };

  return (
    <Modal
      animationIn="fadeIn"
      isVisible={isModalVisible}
      style={tw`m-0`}
      backdropColor="transparent"
      onBackdropPress={endAnimations}
    >
      <Animated.View
        style={[
          tw`p-4 rounded-lg flex-row items-center justify-between max-w-[80%]`,
          animatedStyles,
          containerStyle,
        ]}
      >
        {IconComponent && (
          <View style={{ marginRight: 8 }}>
            <IconComponent color={iconColor || 'black'} />
          </View>
        )}
        <View style={tw`flex-1 flex-col items-center`}>
          {title && (
            <Text
              style={{
                color: titleColor || 'black',
                fontSize: titleSize || 16,
                lineHeight: titleLineHeight || 20,
                fontWeight: 'bold',
                marginBottom: 4,
              }}
            >
              {title}
            </Text>
          )}
          {title && message && (
            <View
              style={{
                height: 1,
                backgroundColor: 'black',
                width: '100%',
              }}
            />
          )}
          <Text
            style={{
              color: messageColor || 'black',
              fontSize: messageSize || 14,
              lineHeight: messageLineHeight || 18,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        </View>
        {close && CloseIconComponent && (
          <TouchableOpacity onPress={endAnimations}>
            <CloseIconComponent color={iconColor || 'black'} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </Modal>
  );
};

export default ToastModal;
