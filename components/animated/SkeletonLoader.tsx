import { StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: '#8790E0',
    borderBottomWidth: 1,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  profil: {
    backgroundColor: '#8790E0',
  },
});

interface ISkeletonLoader {
  variant?: 'box' | 'circle';
  width: string | number;
  height: number;
}

export default function SkeletonLoader({
  width,
  height,
  variant,
}: ISkeletonLoader) {
  const opacity = useRef(new Animated.Value(0.3));

  let borderRadius = 0;

  if (variant === 'circle') {
    borderRadius =
      typeof height === 'string' ? parseInt(height, 10) / 2 : height / 2;
  } else {
    borderRadius = 5;
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.4,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.2,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { opacity: opacity.current, width, height, borderRadius },
        styles.container,
      ]}
    />
  );
}

SkeletonLoader.defaultProps = {
  variant: 'box',
};
